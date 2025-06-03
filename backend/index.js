import 'dotenv/config';   // ← MUST be first to load .env

import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import shiftTypeRoutes from './routes/shiftTypeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import shiftAssignmentRoutes from './routes/shiftAssignmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import prisma from './lib/prismaClient.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { authorizeRole } from './middleware/roleMiddleware.js';
import { seedAdminUser } from './models/User.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 🔐 Auth routes (signup/login)
app.use('/api/auth', authRoutes);

// 🚑 Shift template management
app.use('/api/shift-types', shiftTypeRoutes);

// 📇 Contacts (employees) - unprotected read routes
app.use('/api', contactRoutes);

// 👥 User listing (EMT/Dispatcher) – requires login
app.use(
  '/api/users',
  authenticateToken,
  /* optionally add authorizeRole('admin'), */
  userRoutes
);

// ⏰ Shift assignments – protected per-method in routes
app.use('/api/shift-assignments', authenticateToken, shiftAssignmentRoutes);

// 👑 Admin‑only pages
app.use('/admin', adminRoutes);

// … any other routes (ambulance fleet, etc.) …

// Ensure your seeded admin account exists
await seedAdminUser();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
