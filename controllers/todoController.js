const { v4: uuidv4 } = require('uuid');
const dynamoService = require('../services/dynamoService');

exports.createTodo = async (req, res) => {
  try {
    const {name, completed } = req.body;
    const userId = req.userId;
    const todoItem = { id: uuidv4(), name, completed: completed || false, userId };
    await dynamoService.createTodoItem(todoItem);
    res.status(201).json({ message: 'Todo item created successfully', todoItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo item', error });
  }
};

exports.getTodosByUserId = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
      const result = await dynamoService.getTodoItemsByUserId(userId);
      res.status(200).json(result.Items);
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await dynamoService.updateTodoItem(id, updateData);
    res.status(200).json({ message: 'Todo item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo item', error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await dynamoService.deleteTodoItem(id);
    res.status(200).json({ message: 'Todo item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo item', error });
  }
};
