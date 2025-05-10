import bcrypt from 'bcryptjs';
import prisma from '../lib/prismaClient.js';

// Seed the admin user if not already present
export async function seedAdminUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('securePassword123', 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        station: 'Station 1', // ✅ Add this line
      },
    });

    console.log('Seeded admin user');
  } else {
    console.log('Admin user already exists');
  }
}

// Create a new user (used during registration, etc.)
export async function createUser({ name, email, password, role }) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
}

// Find a user by email (used during login)
export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}
