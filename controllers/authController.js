const bcrypt = require('bcrypt');
const dynamoService = require('../services/dynamoService');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await dynamoService.getUserByUsername(username);
    const user = result.Items;

    if (!user || user.length === 0) {
      return res.status(401).json({ auth: false, message: 'Usuario o contraseña incorrectos' });
    }
    const passwordIsValid = await bcrypt.compare(password, user[0].password);

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, message: 'Usuario o contraseña incorrectos' });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ auth: true, token, userId: user[0].id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};
