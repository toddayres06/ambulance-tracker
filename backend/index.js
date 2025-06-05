import 'dotenv/config';   // ← MUST be first to load .env
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js'; // Import the ambulance routes
import shiftTypeRoutes from './routes/shiftTypeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import shiftAssignmentRoutes from './routes/shiftAssignmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import prisma from './lib/prismaClient.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { seedAdminUser } from './models/User.js';

const app = express();
const PORT = 3001;

// Allow both localhost and production origin
const allowedOrigins = [
  'http://localhost:5173',  // Localhost for dev
  'https://emssync.netlify.app'  // Production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    console.log(`Incoming request from: ${origin}`);  // Debug log
    // If origin is in the allowed origins list or there's no origin (e.g., in Postman or cURL)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the origin if it matches
    } else {
      // Log the error if the origin is not allowed
      console.log(`CORS error: ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));  // Reject other origins
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  // Allow credentials (cookies, tokens)
}));

app.use(express.json());

// 🔐 Auth routes (signup/login)
app.use('/api/auth', authRoutes);

app.use('/api', ambulanceRoutes);  // Use ambulance routes here

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

// Ensure your seeded admin account exists
await seedAdminUser();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
