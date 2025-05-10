import prisma from '../lib/prismaClient.js';

// Create a new Shift Assignment
export const createShiftAssignment = async (req, res) => {
  try {
    const { userId, shiftTypeId, date } = req.body;

    const newShiftAssignment = await prisma.shiftAssignment.create({
      data: {
        userId,
        shiftTypeId,
        date,
      },
    });

    res.status(201).json(newShiftAssignment);
  } catch (error) {
    console.error('Error creating shift assignment:', error);
    res.status(500).json({ error: 'Failed to create shift assignment' });
  }
};

// Get all Shift Assignments
export const getShiftAssignments = async (req, res) => {
  try {
    const shiftAssignments = await prisma.shiftAssignment.findMany({
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
      where: { id: parseInt(id) },
      data: {
        userId,
        shiftTypeId,
        date,
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
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting shift assignment:', error);
    res.status(500).json({ error: 'Failed to delete shift assignment' });
  }
};
