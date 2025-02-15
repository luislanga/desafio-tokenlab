import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.TABLE_NAME;

export const listUsersDynamoDbAdapter = (): QueryCommandInput => {
  return {
    TableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": "USER#",
      ":skPrefix": "USER#",
    },
    ProjectionExpression: "username, userId",
  };
};
