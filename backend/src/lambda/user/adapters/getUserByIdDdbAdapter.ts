const TableName = process.env.TABLE_NAME;

import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

export const getUserByIdDynamoDbAdapter = (
  userId: string
): QueryCommandInput => {
  return {
    TableName,
    KeyConditionExpression: "PK = :pk AND SK = :sk",
    ExpressionAttributeValues: {
      ":pk": "USER#",
      ":sk": `USER#${userId}`,
    },
    ProjectionExpression: "username, userId",
  };
};
