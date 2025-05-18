// /controllers/contactController.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Fetch all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.user.findMany();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

// Create a new contact (with password hashing)
export const createContact = async (req, res) => {
  const { name, email, role, station, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
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
        password: hashedPassword
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
    console.error('Create Contact Error:', err);  // <-- Add this line
    res.status(500).json({ error: 'Error creating contact' });
  }
};

// Update an existing contact
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, station, role, active, shiftStart, shiftEnd } = req.body;

  try {
    const updatedContact = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, station, role, active, shiftStart, shiftEnd }
    });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: 'Error updating contact' });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
};
