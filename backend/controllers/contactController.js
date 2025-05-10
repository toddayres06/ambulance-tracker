// /controllers/contactController.js
import { PrismaClient } from '@prisma/client';
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

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const newContact = await prisma.user.create({ data: req.body });
    res.status(201).json(newContact);
  } catch (err) {
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
