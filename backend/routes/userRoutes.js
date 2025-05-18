// /backend/routes/userRoutes.js

import express from 'express';
import prisma from '../lib/prismaClient.js';

const router = express.Router();

/**
 * GET /api/users/
 * Returns all non-admin users (EMT + Dispatcher)
 */
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ['emt', 'dispatcher'] } },
      select: {
        id: true,
        name: true,
        role: true,
        station: true
      },
      orderBy: { name: 'asc' }
    });
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users', err);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

/**
 * GET /api/users/emts
 * Returns only EMT users
 */
router.get('/emts', async (req, res) => {
  try {
    const emts = await prisma.user.findMany({
      where: { role: 'emt' },
      select: { id: true, name: true, station: true },
      orderBy: { name: 'asc' }
    });
    res.json(emts);
  } catch (err) {
    console.error('Failed to fetch EMTs', err);
    res.status(500).json({ error: 'Could not fetch EMTs' });
  }
});

export default router;
