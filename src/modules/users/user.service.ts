import bcrypt from "bcryptjs";
import { env } from "../../config/env.config.js";
import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { PaginationOptions } from "../../core/utils/pagination.js";
import { CreateUserDto, UpdateUserDto } from "./user.dto.js";
import { userRepository } from "./user.repository.js";

const sanitizeUser = (user: any) => {
  const { password, emailVerificationCodeHash, ...safeUser } = user;
  return safeUser;
};

export class UserService {
  async findAll({ skip, limit }: PaginationOptions) {
    const [users, total] = await userRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
      relations: { role: true }
    });

    return { data: users.map(sanitizeUser), total };
  }

  async findById(id: string) {
    const user = await userRepository.findOne({ where: { id }, relations: { role: true } });
    if (!user) throw new NotFoundError("User not found");
    return sanitizeUser(user);
  }

  async create(dto: CreateUserDto) {
    const existing = await userRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new AppError(409, "Email is already registered");

    const user = userRepository.create({
      ...dto,
      email: dto.email.trim().toLowerCase(),
      password: await bcrypt.hash(dto.password, env.security.bcryptSaltRounds),
      emailVerified: true,
      emailVerifiedAt: new Date()
    });

    return sanitizeUser(await userRepository.save(user));
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError("User not found");

    const nextPassword = dto.password
      ? await bcrypt.hash(dto.password, env.security.bcryptSaltRounds)
      : user.password;

    Object.assign(user, dto, { password: nextPassword });
    return sanitizeUser(await userRepository.save(user));
  }

  async remove(id: string) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError("User not found");
    await userRepository.remove(user);
  }
}

export const userService = new UserService();
