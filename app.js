// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/auth');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', userController.createUser);

app.post('/login', authController.login);

// Aplica el middleware de autenticación a las rutas que quieres proteger
app.use(authMiddleware);
app.use('/api', todoRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
