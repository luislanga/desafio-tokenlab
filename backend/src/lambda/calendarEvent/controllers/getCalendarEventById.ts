import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createResponse } from "../../../utils/createResponse";
import { createHttpError } from "../../../utils/createHttpError";
import { getCalendarEventByIdService } from "../services/getCalendarEventByIdService";

const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const { eventId } = event.pathParameters;
  const calendarEvent = await getCalendarEventByIdService(userId, eventId);

  if (!calendarEvent) {
    throw createHttpError(404, "EVENT_NOT_FOUND");
  }

  return createResponse(200, calendarEvent);
};

export const handler = middy(handlerFunction).use(errorHandler());
