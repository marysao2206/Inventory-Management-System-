<<<<<<< HEAD
"use strict";
=======
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { orderRepository } from "./order.repository.js";
export class OrderService {
    async findAll({ skip, limit }) {
        const [orders, total] = await orderRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: "DESC" }
        });
        return { data: orders, total };
    }
    async findById(id) {
        const order = await orderRepository.findOne({ where: { id } });
        if (!order)
            throw new NotFoundError("Order not found");
        return order;
    }
    async create(dto) {
        const order = orderRepository.create({
            userId: dto.userId ?? null,
            totalAmount: dto.totalAmount.toFixed(2),
            status: dto.status?.trim() || "PENDING"
        });
        return orderRepository.save(order);
    }
    async update(id, dto) {
        const order = await orderRepository.findOne({ where: { id } });
        if (!order)
            throw new NotFoundError("Order not found");
        Object.assign(order, {
            userId: dto.userId !== undefined ? dto.userId : order.userId,
            totalAmount: dto.totalAmount !== undefined ? dto.totalAmount.toFixed(2) : order.totalAmount,
            status: dto.status !== undefined ? dto.status.trim() : order.status
        });
        return orderRepository.save(order);
    }
    async remove(id) {
        const order = await orderRepository.findOne({ where: { id } });
        if (!order)
            throw new NotFoundError("Order not found");
        await orderRepository.remove(order);
    }
}
export const orderService = new OrderService();
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
