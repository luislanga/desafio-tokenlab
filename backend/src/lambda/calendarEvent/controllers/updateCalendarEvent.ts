import middy from "middy";
import Joi from "joi";
import { errorHandler } from "../../../middleware/errorHandler";
import { bodyValidatorMiddleware } from "../../../middleware/bodyValidatorMiddleware";
import { createResponse } from "../../../utils/createResponse";
import { updateCalendarEventService } from "../services/updateCalendarEventService";
import { getCalendarEventByIdService } from "../services/getCalendarEventByIdService";
import { listCalendarEventsByDateService } from "../services/listCalendarEventsService";
import { checkIfTimeRangeIsFree } from "../../../../../utils/checkIfTimeRangeIsFree";
import { createHttpError } from "../../../utils/createHttpError";

const updateEventBodySchema = Joi.object({
  calendarEventDescription: Joi.string().min(1).max(50).optional(),
  startDate: Joi.string().min(1).optional(),
  endDate: Joi.string().min(1).optional(),
  guests: Joi.array().items(Joi.string()).optional(),
});

const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const body = JSON.parse(event.body);
  const calendarEventId = event.pathParameters.eventId;

  const existingEvent = await getCalendarEventByIdService(
    userId,
    calendarEventId
  );

  if (!existingEvent) {
    return createResponse(404, {
      message: "Event not found",
    });
  }

  if (body.startDate || body.endDate) {
    const startDate = body.startDate ?? existingEvent.startDate;
    const endDate = body.endDate ?? existingEvent.endDate;

    if (startDate >= endDate) {
      throw createHttpError(400, '"endDate" must be after "startDate".');
    }

    // refactor this and in create event workflow:

    const eventsInRange = await listCalendarEventsByDateService(
      userId,
      startDate,
      endDate
    );

    if (eventsInRange.length) {
      const newEventStart = Number(startDate);
      const newEventEnd = Number(endDate);

      const takenSlots = eventsInRange.map((event) => ({
        id: event.calendarEventId,
        takenStartDate: Number(event.startDate),
        takenEndDate: Number(event.endDate),
      }));

      takenSlots.sort((a, b) => a.takenStartDate - b.takenStartDate);

      const isTimeRangeFree = await checkIfTimeRangeIsFree(
        newEventStart,
        newEventEnd,
        takenSlots,
        calendarEventId
      );

      if (!isTimeRangeFree) {
        throw createHttpError(400, "This time range is taken.");
      }
    }
  }

  // refactor until here

  const fieldsToUpdate = Object.keys(body).reduce<Record<string, any>>(
    (acc, key) => {
      if (body[key] !== existingEvent[key]) {
        acc[key] = body[key];
      }
      return acc;
    },
    {}
  );

  if (Object.keys(fieldsToUpdate).length === 0) {
    return createResponse(304, {
      message: "No changes detected",
    });
  }

  const updatedEvent = await updateCalendarEventService(
    calendarEventId,
    userId,
    fieldsToUpdate
  );

  return createResponse(200, {
    message: "Event updated successfully",
    updatedEvent,
  });
};

export const handler = middy(handlerFunction)
  .use(bodyValidatorMiddleware(updateEventBodySchema))
  .use(errorHandler());
