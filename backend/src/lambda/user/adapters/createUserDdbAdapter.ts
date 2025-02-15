import { PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { User } from "../../../../../types/User";

const TableName = process.env.TABLE_NAME;

export const createUserDynamoDbAdapter = (user: User): PutCommandInput => {
  return {
    TableName,
    Item: {
      PK: `USER#`,
      SK: `USER#${user.userId}`,
      userId: user.userId,
      username: user.username,
    },
  };
};
