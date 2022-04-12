const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
  const body = JSON.parse(event.body);
  const { id } = event.pathParameters;
  const { completed } = body;
  
  const response = await dynamoDb.update({
    TableName: "TodoTable",
    Key: { id },
    UpdateExpression: "set completed = :completed",
    ExpressionAttributeValues: {
      ':completed': completed,
    },
    ReturnValues: "ALL_NEW",
  }).promise();

  return {
    statusCode: 200,
    msg: 'Todo updated successfully',
    body: JSON.stringify(response.Attributes),
  };
};

module.exports = {
  handler: updateTodo,
}
