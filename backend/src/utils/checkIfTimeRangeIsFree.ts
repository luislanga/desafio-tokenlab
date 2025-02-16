import { listCalendarEventsByDateService } from "../lambda/calendarEvent/services/listCalendarEventsService";

export const checkIfTimeRangeIsFree = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  const eventsInRange = await listCalendarEventsByDateService(
    userId,
    startDate,
    endDate
  );

  if (!eventsInRange.length) {
    return true;
  }

  const newEventStart = Number(startDate);
  const newEventEnd = Number(endDate);

  const takenSlots = eventsInRange.map((event) => ({
    takenStartDate: Number(event.startDate),
    takenEndDate: Number(event.endDate),
  }));

  takenSlots.sort((a, b) => a.takenStartDate - b.takenStartDate);

  for (let i = 0; i < takenSlots.length; i++) {
    const currentEvent = takenSlots[i];
    if (
      newEventStart < currentEvent.takenEndDate &&
      newEventEnd > currentEvent.takenStartDate
    ) {
      return false;
    }
  }
  return true;
};
