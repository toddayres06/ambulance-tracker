// /routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Add a logging middleware before the login controller
router.post('/login', (req, res, next) => {
  console.log('🔥 [LOGIN PAYLOAD]', req.body);
  next(); // continue to the login controller
}, login);

router.post('/signup', signup);

export default router;
