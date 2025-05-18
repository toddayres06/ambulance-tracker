import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './backend/.env' });

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('securePassword123', 10);

  // Create Todd Jones
  await prisma.user.create({
    data: {
      name: 'Todd Jones',
      email: 'todd@example.com',
      station: 'Station 1',
      role: 'emt',
      active: true,
      shiftStart: new Date(),
      shiftEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
      password: hashedPassword,
    },
  });

  // Create Jane Doe
  await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      station: 'Station 2',
      role: 'dispatcher',
      active: false,
      shiftStart: null,
      shiftEnd: null,
      password: hashedPassword,
    },
  });

  // Create Admin
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@admin.com',
      station: 'Station 1',
      role: 'admin',
      active: true,
      shiftStart: new Date(),
      shiftEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
      password: hashedPassword, // ✅ this is what enables login
    },
  });

  console.log('Seeding complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
