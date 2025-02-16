import { DeleteCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.TABLE_NAME;

export const deleteCalendarEventByIdDynamoDbAdapter = (
  userId: string,
  eventId: string
): DeleteCommandInput => {
  return {
    TableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `EVENT#${eventId}`,
    },
  };
};
