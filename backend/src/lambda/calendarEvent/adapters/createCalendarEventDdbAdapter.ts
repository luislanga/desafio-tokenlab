import { PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { CalendarEvent } from "../../../../../types/CalendarEvent";

const TableName = process.env.TABLE_NAME;

export const createCalendarEventDynamoDbAdapter = (
  calendarEvent: CalendarEvent
): PutCommandInput => {
  const {
    userId,
    calendarEventId,
    calendarEventDescription,
    startDate,
    endDate,
    hasGuests,
  } = calendarEvent;
  return {
    TableName,
    Item: {
      PK: `USER#${userId}`,
      SK: `EVENT#${calendarEventId}`,
      GSI1PK: `USER#${userId}`,
      GSI1SK: `EVENT#DATE#${startDate}`,
      hostId: userId,
      calendarEventId,
      calendarEventDescription,
      startDate,
      endDate,
      hasGuests,
    },
    ConditionExpression:
      "attribute_not_exists(PK) AND attribute_not_exists(SK)",
  };
};
