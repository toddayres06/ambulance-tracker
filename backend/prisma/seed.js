import { PrismaClient, Role } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './.env' });

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' }
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists, skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash('securePassword123', 10);

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@admin.com',
      station: 'Station 1',
      role: Role.admin,
      active: true,
      shiftStart: new Date(),
      shiftEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user created successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
