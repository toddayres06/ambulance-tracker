import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Todd Jones',
        email: 'todd@example.com',
        station: 'Station 1',
        role: 'EMT', // You MUST include role (since it's required)
        active: true,
        shiftStart: new Date(),
        shiftEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        station: 'Station 2',
        role: 'DISPATCHER',
        active: false,
        shiftStart: null,
        shiftEnd: null,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding complete!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
