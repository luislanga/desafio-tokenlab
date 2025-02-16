import { standardDelete } from "../../../db/dynamoDbClient";
import { deleteCalendarEventByIdDynamoDbAdapter } from "../adapters/deleteCalendarEventDdbAdapter";

export const deleteCalendarEventService = async (
  userId: string,
  calendarEventId: string
) => {
  const deleteParams = deleteCalendarEventByIdDynamoDbAdapter(
    userId,
    calendarEventId
  );
  return await standardDelete(deleteParams);
};
