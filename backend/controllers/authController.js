// /controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/User');

const JWT_SECRET = 'your_jwt_secret_key'; // 🔥 (we'll upgrade this later with env variables)

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required.' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const user = await createUser(email, password, role);
  res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, role: user.role } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  console.log('Logged in user role:', user.role);

  res.json({ token });
};

module.exports = {
  signup,
  login
};
