import middy from "middy";
import Joi from "joi";
import { ulid } from "ulid";
import { errorHandler } from "../../../middleware/errorHandler";
import { bodyValidatorMiddleware } from "../../../middleware/bodyValidatorMiddleware";
import { createResponse } from "../../../utils/createResponse";
import { createCalendarEventService } from "../services/createCalendarEventService";
import { checkIfTimeRangeIsFree } from "../../../utils/checkIfTimeRangeIsFree";
import { createHttpError } from "../../../utils/createHttpError";

const calendarEventBodySchema = Joi.object({
  calendarEventDescription: Joi.string().required().min(1).max(50),
  startDate: Joi.string().required().min(1),
  endDate: Joi.string().required().min(1),
  guests: Joi.array().items(Joi.string()).required(),
});

const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const body = JSON.parse(event.body);
  
  const isTimeRangeFree = await checkIfTimeRangeIsFree(
    userId,
    body.startDate,
    body.endDate
  );

  if (!isTimeRangeFree) {
    throw createHttpError(400, "This time range is taken.");
  }

  const calendarEvent = {
    calendarEventId: ulid(),
    userId,
    calendarEventDescription: body.calendarEventDescription,
    startDate: body.startDate,
    endDate: body.endDate,
    hasGuests: body.guests && body.guests.length > 0,
  };

  await createCalendarEventService(calendarEvent);

  return createResponse(201, {
    message: "Event created successfully",
  });
};

export const handler = middy(handlerFunction)
  .use(bodyValidatorMiddleware(calendarEventBodySchema))
  .use(errorHandler());
