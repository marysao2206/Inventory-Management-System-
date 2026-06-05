import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { supplierRepository } from "./supplier.repository.js";
export class SupplierService {
    async findAll({ skip, limit }) {
        const [suppliers, total] = await supplierRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: "DESC" }
        });
        return { data: suppliers, total };
    }
    async findById(id) {
        const supplier = await supplierRepository.findOne({ where: { id } });
        if (!supplier)
            throw new NotFoundError("Supplier not found");
        return supplier;
    }
    async create(dto) {
        const name = dto.name.trim();
        const exists = await supplierRepository.findOne({ where: { name } });
        if (exists)
            throw new AppError(409, "Supplier name already exists");
        const supplier = supplierRepository.create({
            name,
            contactName: dto.contactName?.trim() || null,
            phone: dto.phone?.trim() || null,
            email: dto.email?.trim().toLowerCase() || null,
            address: dto.address?.trim() || null
        });
        return supplierRepository.save(supplier);
    }
    async update(id, dto) {
        const supplier = await supplierRepository.findOne({ where: { id } });
        if (!supplier)
            throw new NotFoundError("Supplier not found");
        if (dto.name && dto.name.trim() !== supplier.name) {
            const exists = await supplierRepository.findOne({ where: { name: dto.name.trim() } });
            if (exists)
                throw new AppError(409, "Supplier name already exists");
        }
        Object.assign(supplier, {
            name: dto.name?.trim() ?? supplier.name,
            contactName: dto.contactName !== undefined ? dto.contactName.trim() || null : supplier.contactName,
            phone: dto.phone !== undefined ? dto.phone.trim() || null : supplier.phone,
            email: dto.email !== undefined ? dto.email.trim().toLowerCase() || null : supplier.email,
            address: dto.address !== undefined ? dto.address.trim() || null : supplier.address
        });
        return supplierRepository.save(supplier);
    }
    async remove(id) {
        const supplier = await supplierRepository.findOne({ where: { id } });
        if (!supplier)
            throw new NotFoundError("Supplier not found");
        await supplierRepository.remove(supplier);
    }
}
export const supplierService = new SupplierService();
