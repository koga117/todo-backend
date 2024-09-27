// routes/todoRoutes.js
const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.post('/todos', todoController.createTodo);
router.get('/todos', todoController.getTodosByUserId);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
