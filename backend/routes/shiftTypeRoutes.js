import express from 'express';
import {
  getShiftTypes,
  createShiftType,
  deleteShiftType,
  updateShiftType
} from '../controllers/shiftTypeController.js';

const router = express.Router();

router.get('/', getShiftTypes);
router.post('/', createShiftType);
router.put('/:id', updateShiftType); 
router.delete('/:id', deleteShiftType);

export default router;
