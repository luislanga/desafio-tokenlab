import { GetCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.TABLE_NAME;

export const getCalendarEventByIdDynamoDbAdapter = (
  userId: string,
  eventId: string
): GetCommandInput => {
  return {
    TableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `EVENT#${eventId}`,
    },
    ProjectionExpression:
      "calendarEventId, hostId, calendarEventDescription, startDate, endDate, hasGuests",
  };
};
