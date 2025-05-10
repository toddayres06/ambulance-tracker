import express from 'express';
import {
  createShiftAssignment,
  getShiftAssignments,
  updateShiftAssignment,
  deleteShiftAssignment,
} from '../controllers/shiftAssignmentController.js';

const router = express.Router();

// Create a shift assignment
router.post('/', createShiftAssignment);

// Get all shift assignments
router.get('/', getShiftAssignments);

// Update a shift assignment
router.put('/:id', updateShiftAssignment);

// Delete a shift assignment
router.delete('/:id', deleteShiftAssignment);

export default router;
