import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.TABLE_NAME;

export const listCalendarEventsDynamoDbAdapter = (
  userId: string
): QueryCommandInput => {
  return {
    TableName,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":skPrefix": "EVENT#",
    },
    ProjectionExpression: "calendarEventId, hostId, calendarEventDescription, startDate, endDate, hasGuests",
  };
};
