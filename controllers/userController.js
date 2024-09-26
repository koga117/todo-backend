// controllers/userController.js
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const dynamoService = require('../services/dynamoService');

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword
  };

  try {
    await dynamoService.createUser(newUser);
    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};
