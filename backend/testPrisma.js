// testPrisma.js
import prisma from './lib/prismaClient.js';  // Import your prisma client

async function testPrisma() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log(result);
  } catch (error) {
    console.error('Error running query:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
