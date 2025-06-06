import 'dotenv/config';  // ← MUST be first to load .env
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';
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
  'https://emssync.netlify.app',  // Production frontend URL
  'https://ambulance-tracker-7e8t.onrender.com'  // Your Render backend URL
];

app.use(cors({
  origin: function (origin, callback) {
    console.log(`Incoming request from: ${origin}`);  // Debug log

    // Add this line to catch undefined origins
    if (!origin) {
      console.log("Request has no origin, likely a direct call or Postman/cURL");
    }
    // Allow requests without an origin (e.g., Postman, curl, etc.)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS error: ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// 🔐 Auth routes (signup/login)
app.use('/api/auth', authRoutes);

// Debug logging
console.log("Registered ambulance routes");
app.use('/api', ambulanceRoutes);  // Use ambulance routes here

// 🚑 Shift template management
console.log("Registered shift template routes");
app.use('/api/shift-types', shiftTypeRoutes);

// 📇 Contacts (employees) - unprotected read routes
console.log("Registered contact routes");
app.use('/api', contactRoutes);

// 👥 User listing (EMT/Dispatcher) – requires login
console.log("Registered user routes");
app.use(
  '/api/users',
  authenticateToken,
  /* optionally add authorizeRole('admin'), */
  userRoutes
);

// ⏰ Shift assignments – protected per-method in routes
console.log("Registered shift assignment routes");
app.use('/api/shift-assignments', authenticateToken, shiftAssignmentRoutes);

// 👑 Admin‑only pages
console.log("Registered admin routes");
app.use('/admin', adminRoutes);

// Ensure your seeded admin account exists
await seedAdminUser();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
