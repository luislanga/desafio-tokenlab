import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createResponse } from "../../../utils/createResponse";
import { listCalendarEventsService } from "../services/listCalendarEventsService";

const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;

  const calendarEvents = await listCalendarEventsService(userId);

  return createResponse(200, calendarEvents);
};

export const handler = middy(handlerFunction)
  .use(errorHandler());
