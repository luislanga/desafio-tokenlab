import { query } from "../../../db/dynamoDbClient";
import { listCalendarEventsDynamoDbAdapter } from "../adapters/listCalendarEventsDdbAdapter";

export const listCalendarEventsService = async (userId: string) => {
  const queryParams = listCalendarEventsDynamoDbAdapter(userId);
  return await query(queryParams);
};
