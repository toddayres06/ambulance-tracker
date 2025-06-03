// /backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'my_ambulance_company';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];  // Get the token from the header
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Log the decoded payload to verify the data inside the token
    console.log("Decoded JWT Payload:", payload);  // <-- Log decoded payload

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set the user in the request object for later use
    req.user = { id: user.id, role: user.role };

    // Log the user object to verify it's correctly set
    console.log("Authenticated User:", req.user);  // <-- Log user after assigning to req.user

    next();
  });
};
