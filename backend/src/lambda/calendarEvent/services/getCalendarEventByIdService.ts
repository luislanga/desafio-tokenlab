import { get, query } from "../../../db/dynamoDbClient";
import { getCalendarEventByIdDynamoDbAdapter } from "../adapters/getCalendarEventByIdDdbAdapter";

export const getCalendarEventByIdService = async (
  userId: string,
  eventId: string
) => {
  const queryParams = getCalendarEventByIdDynamoDbAdapter(userId, eventId);
  return await get(queryParams);
};
