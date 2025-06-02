import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Get Contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.user.findMany();
    res.json(contacts);
  } catch (err) {
    console.error('❌ Error in getContacts:', err);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

// Create Contact
export const createContact = async (req, res) => {
  console.log("🔥 FULL request payload:", req.body);

  const { name, email, role, station, password } = req.body;

  console.log('🛑 Incoming contact payload:', req.body);  // KEEP THIS FOR DEBUGGING

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, role and password are required.' });
  }

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

// Update Contact
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

// Delete a contact safely
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Attempting to delete user with id: ${id}`);

  try {
    // Delete related shift assignments and schedules first (to prevent FK constraint errors)
    await prisma.shiftAssignment.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.schedule.deleteMany({ where: { userId: parseInt(id) } });

    // Now delete the user itself
    await prisma.user.delete({ where: { id: parseInt(id) } });

    res.status(204).send();
  } catch (err) {
    console.error('❌ Delete Contact Error:', err);
    res.status(500).json({ error: 'Error deleting contact' });
  }
};

