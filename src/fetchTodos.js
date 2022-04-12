const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fetchTodos = async (event) => {
  try {
    const todos = await dynamoDb.scan({ TableName: "TodoTable" }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(todos.Items),
    };
  }  catch (error) {
      console.error('ERROR:', error);
      return {
        statusCode: 500,
      };
  }
};

module.exports = {
  handler: fetchTodos,
}
