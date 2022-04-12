const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const addTodo = async (event) => {
  const body = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    id,
    createdAt,
    todo: body.todo,
    completed: false,
  }
  
  await dynamoDb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo,
}
