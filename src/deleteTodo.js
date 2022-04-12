const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const deleteTodo = async (event) => {
  const { id } = event.pathParameters;

  await dynamoDb.delete({
    TableName: "TodoTable",
    Key: { id },
  }) .promise()

  return {
    statusCode: 200,
  };
};

module.exports = {
  handler: deleteTodo,
}
