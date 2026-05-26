import bcrypt from "bcryptjs";
import { env } from "../../config/env.config";
import { RoleName } from "../../constants/roles.constant";
import { AppDataSource } from "../data-source";
import { roleRepository, authUserRepository } from "../../modules/auth/auth.repository";

const seed = async () => {
  await AppDataSource.initialize();

  for (const name of Object.values(RoleName)) {
    const exists = await roleRepository.findOne({ where: { name } });
    if (!exists) await roleRepository.save(roleRepository.create({ name }));
  }

  const adminRole = await roleRepository.findOneByOrFail({ name: RoleName.ADMIN });
  const adminEmail = "admin@example.com";
  const admin = await authUserRepository.findOne({ where: { email: adminEmail } });

  if (!admin) {
    await authUserRepository.save(
      authUserRepository.create({
        roleId: adminRole.id,
        fullName: "System Admin",
        email: adminEmail,
        password: await bcrypt.hash("Admin12345", env.security.bcryptSaltRounds),
        status: true,
        emailVerified: true,
        emailVerifiedAt: new Date()
      })
    );
  } else if (!admin.emailVerified || !admin.status) {
    admin.status = true;
    admin.emailVerified = true;
    admin.emailVerifiedAt = admin.emailVerifiedAt ?? new Date();
    admin.emailVerificationCodeHash = null;
    admin.emailVerificationExpiresAt = null;
    await authUserRepository.save(admin);
  }

  await AppDataSource.destroy();
  console.log("Seed completed. Admin login: admin@example.com / Admin12345");
};

seed().catch(async (error) => {
  console.error(error);
  if (AppDataSource.isInitialized) await AppDataSource.destroy();
  process.exit(1);
});
