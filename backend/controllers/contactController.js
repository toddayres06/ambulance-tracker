import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createContact = async (req, res) => {
  const { name, email, role, station, password } = req.body;

  console.log('🛑 Incoming contact payload:', req.body);  // KEEP THIS FOR DEBUGGING

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, role and password are required.' });
  }

  // Validate role strictly
  if (!Object.values(Role).includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        station,
        password: hashedPassword,
        active: true,
        shiftStart: null,
        shiftEnd: null
      }
    });

    res.status(201).json({
      message: 'Contact created successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        station: newUser.station
      }
    });
  } catch (err) {
    console.error('Create Contact Error:', err);
    res.status(500).json({ error: 'Error creating contact' });
  }
};
