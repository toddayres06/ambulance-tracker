import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });  // Ensure environment variables are loaded

import prisma from '../lib/prismaClient.js'; // Use the singleton Prisma instance

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);  // Log fetched users
  } catch (e) {
    console.error('Error fetching users:', e);  // Catch and log any errors
  } finally {
    await prisma.$disconnect();  // Ensure proper disconnection
  }
}

main();
