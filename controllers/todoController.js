const { v4: uuidv4 } = require('uuid');
const dynamoService = require('../services/dynamoService');

exports.createTodo = async (req, res) => {
  try {
    const {name, completed } = req.body;
    const todoItem = { id: uuidv4(), name, completed: completed || false };
    await dynamoService.createTodoItem(todoItem);
    res.status(201).json({ message: 'Todo item created successfully', todoItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo item', error });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const data = await dynamoService.getTodoItems();
    res.status(200).json(data.Items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo items', error });
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
