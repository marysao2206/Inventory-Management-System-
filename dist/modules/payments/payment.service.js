<<<<<<< HEAD
"use strict";
=======
import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { paymentRepository } from "./payment.repository.js";
export class PaymentService {
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
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
