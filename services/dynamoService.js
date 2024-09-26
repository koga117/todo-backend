// services/dynamoService.js
const AWS = require('aws-sdk');
require('dotenv').config();

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

const TABLE_NAME = 'todos';

const dynamoService = {

  async createUser(user) {
    const params = {
      TableName: 'users',
      Item: user
    };
    return dynamoDb.put(params).promise();
  },

  async getUserByUsername(username) {
    const params = {
      TableName: 'users',
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };
    
    return dynamoDb.query(params).promise();
  },

  async createTodoItem(item) {
    const params = {
      TableName: TABLE_NAME,
      Item: item
    };
    return dynamoDb.put(params).promise();
  },

  async getTodoItems() {
    const params = {
      TableName: TABLE_NAME
    };
    return dynamoDb.scan(params).promise();
  },

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

  async deleteTodoItem(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    return dynamoDb.delete(params).promise();
  }
};

module.exports = dynamoService;
