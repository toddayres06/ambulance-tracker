// test-prisma.js
import prisma from './lib/prismaClient.js';

(async () => {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Prisma error:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
