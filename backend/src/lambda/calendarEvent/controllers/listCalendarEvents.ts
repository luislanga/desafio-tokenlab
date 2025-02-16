import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createResponse } from "../../../utils/createResponse";
import {
  listCalendarEventsService,
  listCalendarEventsByDateService,
} from "../services/listCalendarEventsService";
import { createHttpError } from "../../../utils/createHttpError";

const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const { startDate, endDate } = event.queryStringParameters || {}; // unix from query params

  if (startDate && endDate) {
    const start = Number(startDate);
    const end = Number(endDate);

    if (isNaN(start) || isNaN(end)) {
      throw createHttpError(400, "Invalid date format");
    }

    if (end < start) {
      throw createHttpError(
        400,
        "endDate must be the same as or after startDate"
      );
    }
    const calendarEvents = await listCalendarEventsByDateService(
      userId,
      startDate,
      endDate
    );
    return createResponse(200, calendarEvents);
  } else {
    const calendarEvents = await listCalendarEventsService(userId);
    return createResponse(200, calendarEvents);
  }
};

export const handler = middy(handlerFunction).use(errorHandler());
