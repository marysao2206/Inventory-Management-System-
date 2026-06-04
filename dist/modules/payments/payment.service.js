import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { paymentRepository } from "./payment.repository.js";
import { orderRepository } from "../orders/order.repository.js";
export class PaymentService {
    toNumber(value) {
        if (typeof value === "number" && Number.isFinite(value))
            return value;
        if (typeof value === "string") {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : null;
        }
        return null;
    }
    findFirstNumberByKeys(source, keys) {
        if (!source || typeof source !== "object")
            return null;
        const entries = Object.entries(source);
        for (const [key, value] of entries) {
            const keyLc = key.toLowerCase();
            if (keys.some((k) => keyLc.includes(k))) {
                const direct = this.toNumber(value);
                if (direct !== null)
                    return direct;
            }
        }
        for (const [, value] of entries) {
            if (value && typeof value === "object") {
                const nested = this.findFirstNumberByKeys(value, keys);
                if (nested !== null)
                    return nested;
            }
        }
        return null;
    }
    findFirstStringByKeys(source, keys) {
        if (!source || typeof source !== "object")
            return null;
        const entries = Object.entries(source);
        for (const [key, value] of entries) {
            const keyLc = key.toLowerCase();
            if (keys.some((k) => keyLc.includes(k)) && typeof value === "string" && value.trim().length > 0) {
                return value.trim();
            }
        }
        for (const [, value] of entries) {
            if (value && typeof value === "object") {
                const nested = this.findFirstStringByKeys(value, keys);
                if (nested)
                    return nested;
            }
        }
        return null;
    }
    isBakongSuccess(source) {
        if (!source || typeof source !== "object")
            return false;
        const status = this.findFirstStringByKeys(source, ["status", "state", "result"]);
        if (status && ["success", "succeeded", "completed", "paid"].includes(status.toLowerCase())) {
            return true;
        }
        const code = this.findFirstNumberByKeys(source, ["errorcode", "code", "statuscode"]);
        return code === 0 || code === 200;
    }
    async finalizeFromBakongCheck(orderId, md5, bakongResult) {
        const order = await orderRepository.findOne({ where: { id: orderId } });
        if (!order)
            throw new NotFoundError("Order not found");
        const expectedAmount = Number(order.totalAmount);
        if (!Number.isFinite(expectedAmount)) {
            throw new AppError(500, "Invalid order amount");
        }
        const paidAmount = this.findFirstNumberByKeys(bakongResult, ["amount", "transactionamount"]);
        const transactionId = this.findFirstStringByKeys(bakongResult, ["transactionid", "txid", "hash"]);
        const success = this.isBakongSuccess(bakongResult);
        let status = "FAILED";
        if (success && paidAmount !== null) {
            status = Math.abs(paidAmount - expectedAmount) < 0.000001 ? "PAID" : "MISMATCH";
        }
        const payment = (await paymentRepository.findOne({ where: { orderId } })) ??
            paymentRepository.create({
                orderId,
                amount: expectedAmount.toFixed(2),
                paymentMethod: "KHQR"
            });
        payment.khqrToken = md5;
        payment.transactionId = transactionId ?? payment.transactionId ?? null;
        payment.amount = expectedAmount.toFixed(2);
        payment.status = status;
        payment.paidAt = status === "PAID" ? new Date() : null;
        await paymentRepository.save(payment);
        if (status === "PAID") {
            order.status = "PAID";
            await orderRepository.save(order);
        }
        return {
            orderId,
            expectedAmount,
            paidAmount,
            status,
            paymentId: payment.id,
            transactionId: payment.transactionId,
            bakongResult
        };
    }
    async findAll({ skip, limit }) {
        const [payments, total] = await paymentRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: "DESC" }
        });
        return { data: payments, total };
    }
    async findById(id) {
        const payment = await paymentRepository.findOne({ where: { id } });
        if (!payment)
            throw new NotFoundError("Payment not found");
        return payment;
    }
    async create(dto) {
        const existingTransaction = dto.transactionId
            ? await paymentRepository.findOne({ where: { transactionId: dto.transactionId } })
            : null;
        if (existingTransaction) {
            throw new AppError(409, "Transaction ID already exists");
        }
        const payment = paymentRepository.create({
            ...dto,
            amount: dto.amount.toFixed(2)
        });
        return paymentRepository.save(payment);
    }
    async update(id, dto) {
        const payment = await paymentRepository.findOne({ where: { id } });
        if (!payment)
            throw new NotFoundError("Payment not found");
        if (dto.transactionId && dto.transactionId !== payment.transactionId) {
            const existingTransaction = await paymentRepository.findOne({ where: { transactionId: dto.transactionId } });
            if (existingTransaction)
                throw new AppError(409, "Transaction ID already exists");
        }
        Object.assign(payment, {
            ...dto,
            amount: dto.amount !== undefined ? dto.amount.toFixed(2) : payment.amount
        });
        return paymentRepository.save(payment);
    }
    async remove(id) {
        const payment = await paymentRepository.findOne({ where: { id } });
        if (!payment)
            throw new NotFoundError("Payment not found");
        await paymentRepository.remove(payment);
    }
}
export const paymentService = new PaymentService();
