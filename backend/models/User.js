// /models/User.js
const bcrypt = require('bcryptjs');

let users = []; // In-memory user store

const createUser = async (email, password, role = 'dispatcher') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashedPassword, role };
  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

module.exports = {
  createUser,
  findUserByEmail
};
