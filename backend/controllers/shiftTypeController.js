// /backend/controllers/shiftTypeController.js
import prisma from '../lib/prismaClient.js';

// Get all shift types
export const getShiftTypes = async (req, res) => {
  console.log('🔍 [GET /api/shift-types] hit, req.user =', req.user);
  try {
    const shiftTypes = await prisma.shiftType.findMany();
    console.log('✅ Retrieved shiftTypes:', shiftTypes.length);
    res.json(shiftTypes);
  } catch (error) {
    console.error('❌ Error fetching shift types:', error);
    res.status(500).json({ error: 'Failed to fetch shift types' });
  }
};

// Create a shift type
export const createShiftType = async (req, res) => {
  const { name, startTime, endTime } = req.body;
  try {
    const newShift = await prisma.shiftType.create({
      data: { name, startTime, endTime },
    });
    res.status(201).json(newShift);
  } catch (error) {
    console.error('Error creating shift type:', error);
    res.status(500).json({ error: 'Failed to create shift type' });
  }
};

// Delete a shift type
export const deleteShiftType = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.shiftType.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting shift type:', error);
    res.status(500).json({ error: 'Failed to delete shift type' });
  }
};

// /backend/controllers/shiftTypeController.js
// Existing methods...

// PUT: Update a shift type by ID
export const updateShiftType = async (req, res) => {
  const { id } = req.params; // Get shift type ID from URL params
  const { name, startTime, endTime } = req.body; // Fields to update

  try {
    const updatedShiftType = await prisma.shiftType.update({
      where: { id: parseInt(id) }, // Ensure ID is parsed correctly
      data: { name, startTime, endTime }, // Update the shift type with new data
    });

    if (!updatedShiftType) {
      return res.status(404).json({ message: 'Shift type not found' });
    }

    res.json(updatedShiftType); // Send the updated shift type as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shift type.' });
  }
};

