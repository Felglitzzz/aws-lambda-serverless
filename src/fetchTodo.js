const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fetchTodo = async (event) => {
  const { id } = event.pathParameters;
  try {
    const todos = await dynamoDb.get({ TableName: "TodoTable", Key: { id } }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(todos.Item),
    };
  }  catch (error) {
      console.error('ERROR:', error);
      return {
        statusCode: 500,
      };
  }
};

module.exports = {
  handler: fetchTodo,
}
