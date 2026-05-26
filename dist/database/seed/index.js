"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_config_1 = require("../../config/env.config");
const roles_constant_1 = require("../../constants/roles.constant");
const data_source_1 = require("../data-source");
const auth_repository_1 = require("../../modules/auth/auth.repository");
const seed = async () => {
    await data_source_1.AppDataSource.initialize();
    for (const name of Object.values(roles_constant_1.RoleName)) {
        const exists = await auth_repository_1.roleRepository.findOne({ where: { name } });
        if (!exists)
            await auth_repository_1.roleRepository.save(auth_repository_1.roleRepository.create({ name }));
    }
    const adminRole = await auth_repository_1.roleRepository.findOneByOrFail({ name: roles_constant_1.RoleName.ADMIN });
    const adminEmail = "admin@example.com";
    const admin = await auth_repository_1.authUserRepository.findOne({ where: { email: adminEmail } });
    if (!admin) {
        await auth_repository_1.authUserRepository.save(auth_repository_1.authUserRepository.create({
            roleId: adminRole.id,
            fullName: "System Admin",
            email: adminEmail,
            password: await bcryptjs_1.default.hash("Admin12345", env_config_1.env.security.bcryptSaltRounds),
            status: true,
            emailVerified: true,
            emailVerifiedAt: new Date()
        }));
    }
    else if (!admin.emailVerified || !admin.status) {
        admin.status = true;
        admin.emailVerified = true;
        admin.emailVerifiedAt = admin.emailVerifiedAt ?? new Date();
        admin.emailVerificationCodeHash = null;
        admin.emailVerificationExpiresAt = null;
        await auth_repository_1.authUserRepository.save(admin);
    }
    await data_source_1.AppDataSource.destroy();
    console.log("Seed completed. Admin login: admin@example.com / Admin12345");
};
seed().catch(async (error) => {
    console.error(error);
    if (data_source_1.AppDataSource.isInitialized)
        await data_source_1.AppDataSource.destroy();
    process.exit(1);
});
