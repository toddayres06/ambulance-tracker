// /backend/routes/shiftAssignmentRoutes.js

import express from 'express';
import {
  createShiftAssignment,
  getShiftAssignments,
  updateShiftAssignment,
  deleteShiftAssignment,
} from '../controllers/shiftAssignmentController.js';

// Import our auth middleware
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// --- All routes require a valid JWT ---
router.use(authenticateToken);

// --- ADMIN ONLY: create a new shift assignment ---
router.post(
  '/',
  authorizeRole('admin'),
  createShiftAssignment
);

// --- ADMIN ONLY: update an existing shift assignment ---
router.put(
  '/:id',
  authorizeRole('admin'),
  updateShiftAssignment
);

// --- ADMIN ONLY: delete a shift assignment ---
router.delete(
  '/:id',
  authorizeRole('admin'),
  deleteShiftAssignment
);

// --- ALL AUTHENTICATED USERS: get assignments ---
// In the controller, we'll check `req.user.role`
// and filter accordingly (admins see all; others see only theirs)
router.get(
  '/',
  getShiftAssignments
);

export default router;
