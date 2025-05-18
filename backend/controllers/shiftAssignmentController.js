// /backend/controllers/shiftAssignmentController.js

import prisma from '../lib/prismaClient.js';

// Create a new Shift Assignment
export const createShiftAssignment = async (req, res) => {
  try {
    const { userId, shiftTypeId, date } = req.body;

    // Convert incoming date string (YYYY‑MM‑DD) into a JS Date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const newShiftAssignment = await prisma.shiftAssignment.create({
      data: {
        userId,
        shiftTypeId,
        date: dateObj,
      },
    });

    res.status(201).json(newShiftAssignment);
  } catch (error) {
    console.error('Error creating shift assignment:', error);
    res.status(500).json({ error: 'Failed to create shift assignment' });
  }
};

// Get Shift Assignments
// - Admins see all assignments
// - Other users see only their own
export const getShiftAssignments = async (req, res) => {
  console.log('🔥 req.user:', req.user);
  try {
    const { role, id: userId } = req.user;

    const whereClause = role === 'admin'
      ? {}
      : { userId };

    const shiftAssignments = await prisma.shiftAssignment.findMany({
      where: whereClause,
      include: {
        user: true,
        shiftType: true,
      },
    });

    res.json(shiftAssignments);
  } catch (error) {
    console.error('Error fetching shift assignments:', error);
    res.status(500).json({ error: 'Failed to fetch shift assignments' });
  }
};

// Update a Shift Assignment
export const updateShiftAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, shiftTypeId, date } = req.body;

    const updatedShiftAssignment = await prisma.shiftAssignment.update({
      where: { id: parseInt(id, 10) },
      data: {
        userId,
        shiftTypeId,
        date: new Date(date),
      },
    });

    res.json(updatedShiftAssignment);
  } catch (error) {
    console.error('Error updating shift assignment:', error);
    res.status(500).json({ error: 'Failed to update shift assignment' });
  }
};

// Delete a Shift Assignment
export const deleteShiftAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.shiftAssignment.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting shift assignment:', error);
    res.status(500).json({ error: 'Failed to delete shift assignment' });
  }
};
