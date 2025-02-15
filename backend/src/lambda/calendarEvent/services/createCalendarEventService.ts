import { create } from "../../../db/dynamoDbClient";
import { CalendarEvent } from "../../../../../types/CalendarEvent";
import { createCalendarEventDynamoDbAdapter } from "../adapters/createCalendarEventDdbAdapter";

export const createCalendarEventService = async (
  calendarEvent: CalendarEvent
) => {
  const putParams = createCalendarEventDynamoDbAdapter(calendarEvent);
  return await create(putParams);
};
