// /routes/contactRoutes.js
import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

// Good RESTful design keeps these as follows:
router.get('/api/contacts', getContacts);
router.post('/api/contacts', createContact);
router.put('/api/contacts/:id', updateContact);
router.delete('/api/contacts/:id', deleteContact);

export default router;
