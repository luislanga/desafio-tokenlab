import { query } from "../../../db/dynamoDbClient";
import { listCalendarEventsByDateDynamoDbAdapter, listCalendarEventsDynamoDbAdapter } from "../adapters/listCalendarEventsDdbAdapter";

export const listCalendarEventsService = async (userId: string) => {
  const queryParams = listCalendarEventsDynamoDbAdapter(userId);
  return await query(queryParams);
};

export const listCalendarEventsByDateService = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  const queryParams = listCalendarEventsByDateDynamoDbAdapter(
    userId,
    startDate,
    endDate
  );
  return await query(queryParams);
};
