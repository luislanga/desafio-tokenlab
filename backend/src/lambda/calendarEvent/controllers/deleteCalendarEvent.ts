import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { getCalendarEventByIdService } from "../services/getCalendarEventByIdService";
import { createHttpError } from "../../../utils/createHttpError";
import { createResponse } from "../../../utils/createResponse";
import { deleteCalendarEventService } from "../services/deleteCalendarEventService";

export const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const calendarEventId = event.pathParameters.eventId;

  const calendarEvent = await getCalendarEventByIdService(
    userId,
    calendarEventId
  );
  if (!calendarEvent) {
    throw createHttpError(404, "Event not found.");
  }

  await deleteCalendarEventService(userId, calendarEventId);

  return createResponse(200, "Event deleted successfully.");
};

export const handler = middy(handlerFunction).use(errorHandler());
