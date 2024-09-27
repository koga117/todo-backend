// services/dynamoService.js
const AWS = require('aws-sdk');
require('dotenv').config();

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

const TABLE_NAME = 'todos';
const USERS_TABLE_NAME = 'users';

const dynamoService = {

  // Usuario: Crear usuario
  async createUser(user) {
    const params = {
      TableName: USERS_TABLE_NAME,
      Item: user
    };
    return dynamoDb.put(params).promise();
  },

  // Usuario: Consultar usuario por username (utilizando GSI)
  async getUserByUsername(username) {
    const params = {
      TableName: USERS_TABLE_NAME,
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };
    return dynamoDb.query(params).promise();
  },

  // TODO: Crear tarea, asociada a un userId
  async createTodoItem(item) {
    const params = {
      TableName: TABLE_NAME,
      Item: item
    };
    return dynamoDb.put(params).promise();
  },

  // TODO: Obtener todas las tareas (sin filtrar por userId)
  async getTodoItems() {
    const params = {
      TableName: TABLE_NAME
    };
    return dynamoDb.scan(params).promise();
  },

  // TODO: Obtener tareas por userId usando GSI
  async getTodoItemsByUserId(userId) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'userId-index',
      KeyConditionExpression: '#userIdIndex = :userId',
      ExpressionAttributeNames: {
        '#userIdIndex': 'userId-index'  // Define el alias para evitar conflictos con palabras reservadas
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };
    return dynamoDb.query(params).promise();
  },

  // TODO: Actualizar tarea por id
  async updateTodoItem(id, updateData) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set #name = :name, #completed = :completed, #description = :description',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#completed': 'completed',
        '#description': 'description'
      },
      ExpressionAttributeValues: {
        ':name': updateData.name,
        ':completed': updateData.completed,
        ':description': updateData.description || ''
      },
      ReturnValues: 'UPDATED_NEW'
    };
    return dynamoDb.update(params).promise();
  },

  // TODO: Eliminar tarea por id
  async deleteTodoItem(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    return dynamoDb.delete(params).promise();
  }
};

module.exports = dynamoService;
