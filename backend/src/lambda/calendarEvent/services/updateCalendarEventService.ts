import { update } from "../../../db/dynamoDbClient";
import { CalendarEvent } from "../../../../../types/CalendarEvent";
import { updateCalendarEventDynamoDbAdapter } from "../adapters/updateCalendarEventDdbAdapter";

export const updateCalendarEventService = async (
  calendarEventId: string,
  userId: string,
  fieldsToUpdate: Partial<CalendarEvent>
) => {
  const updateParams = updateCalendarEventDynamoDbAdapter(
    calendarEventId,
    userId,
    fieldsToUpdate
  );

  return await update(updateParams);
};
