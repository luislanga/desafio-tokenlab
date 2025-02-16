import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.TABLE_NAME;

export const getCalendarEventByIdDynamoDbAdapter = (
  userId: string,
  eventId: string
): QueryCommandInput => {
  return {
    TableName,
    KeyConditionExpression: "PK = :pk AND SK = :sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `EVENT#${eventId}`,
    },
    ProjectionExpression:
      "calendarEventId, hostId, calendarEventDescription, startDate, endDate, hasGuests",
  };
};
