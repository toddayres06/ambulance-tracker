import express from 'express';
import { setUserPassword } from '../controllers/adminController.js';

const router = express.Router();

// POST: Admin sets password for a user
router.post('/set-password', setUserPassword);

export default router;
