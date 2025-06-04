import { PrismaClient, Role } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './.env' });

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists, skipping seed.');
  } else {
    const hashedPassword = await bcrypt.hash('securePassword123', 10);

    // Create an Admin User
    const admin = await prisma.user.create({
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

    // Create a sample ambulance for testing purposes
    const ambulance = await prisma.ambulance.create({
      data: {
        latitude: 29.7604, // Example: Houston coordinates
        longitude: -95.3698, 
        status: 'active',
        driverId: admin.id, // Assign it to the admin user as the driver
      },
    });

    console.log('✅ Ambulance created with ID:', ambulance.id);
  }

  await prisma.$disconnect();
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
