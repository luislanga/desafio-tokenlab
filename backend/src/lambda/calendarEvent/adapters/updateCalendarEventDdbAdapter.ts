import { UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { CalendarEvent } from "../../../../../types/CalendarEvent";

const TableName = process.env.TABLE_NAME;

export const updateCalendarEventDynamoDbAdapter = (
  calendarEventId: string,
  userId: string,
  fieldsToUpdate: any
): UpdateCommandInput => {
  const updateExpressions = [];
  const expressionAttributeNames: any = {};
  const expressionAttributeValues: any = {};

  for (const [key, value] of Object.entries(fieldsToUpdate)) {
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = value;
  }

  const updateExpression = `SET ${updateExpressions.join(", ")}`;

  return {
    TableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `EVENT#${calendarEventId}`,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };
};
