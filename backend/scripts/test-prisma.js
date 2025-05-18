// scripts/test-prisma.js
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
