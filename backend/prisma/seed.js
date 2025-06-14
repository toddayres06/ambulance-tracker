import prisma from '../lib/prismaClient.js'; // Use the singleton instance
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { ROLES } from '../constants/roles.js'; // Import the ROLES constant

dotenv.config({ path: './.env' });

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
        role: ROLES.ADMIN, // Use the ROLES constant for the role
        active: true,
        shiftStart: new Date(),
        shiftEnd: new Date(Date.now() + 8 * 60 * 60 * 1000),
        password: hashedPassword,
      },
    });

    console.log('✅ Admin user created successfully!');

    // Create sample ambulances for testing purposes
    const ambulance1 = await prisma.ambulance.create({
      data: {
        latitude: 29.7604, // Example: Houston coordinates
        longitude: -95.3698,
        status: 'active',
        driverId: admin.id, // Assign it to the admin user as the driver
      },
    });
    console.log('✅ Ambulance 1 created with ID:', ambulance1.id);

    const ambulance2 = await prisma.ambulance.create({
      data: {
        latitude: 30.2672, // Austin coordinates
        longitude: -97.7431,
        status: 'en route',
        driverId: admin.id, // Assign it to the admin user as the driver
      },
    });
    console.log('✅ Ambulance 2 created with ID:', ambulance2.id);

    const ambulance3 = await prisma.ambulance.create({
      data: {
        latitude: 32.7767, // Dallas coordinates
        longitude: -96.7970,
        status: 'on scene',
        driverId: admin.id, // Assign it to the admin user as the driver
      },
    });
    console.log('✅ Ambulance 3 created with ID:', ambulance3.id);
  }

  await prisma.$disconnect();
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
