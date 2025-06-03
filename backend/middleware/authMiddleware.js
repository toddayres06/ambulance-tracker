// /backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'my_ambulance_company';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log("Decoded JWT Payload:", payload);  // Log payload here for debugging

    // Fetch the user to get their role
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = { id: user.id, role: user.role };
    next();
  });
};
