const TableName = process.env.TABLE_NAME;

import { GetCommandInput } from "@aws-sdk/lib-dynamodb";

export const getUserByIdDynamoDbAdapter = (userId: string): GetCommandInput => {
  return {
    TableName,
    Key: {
      PK: "USER#",
      SK: `USER#${userId}`,
    },
    ProjectionExpression: "username, userId",
  };
};
