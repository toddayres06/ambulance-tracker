// /routes/contactRoutes.js
import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('🔍 Request to get contacts');  // Log the incoming GET request
  next();  // Continue to the controller
}, getContacts);

router.post('/', (req, res, next) => {
  console.log('🔍 Request to create a contact:', req.body);  // Log the incoming POST request
  next();  // Continue to the controller
}, createContact);

router.put('/:id', (req, res, next) => {
  console.log('🔍 Request to update contact:', req.body);  // Log the incoming PUT request
  next();  // Continue to the controller
}, updateContact);

router.delete('/:id', (req, res, next) => {
  console.log('🔍 Request to delete contact with ID:', req.params.id);  // Log the incoming DELETE request
  next();  // Continue to the controller
}, deleteContact);

export default router;
