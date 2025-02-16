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

  const newEventStart = Number(startDate);
  const newEventEnd = Number(endDate);

  const takenSlots = eventsInRange.map((event) => ({
    takenStartDate: Number(event.startDate),
    takenEndDate: Number(event.endDate),
  }));

  takenSlots.sort((a, b) => a.takenStartDate - b.takenStartDate);

  if (newEventEnd <= takenSlots[0].takenStartDate) {
    return true;
  }

  if (newEventStart >= takenSlots[takenSlots.length - 1].takenEndDate) {
    return true;
  }

  for (let i = 0; i < takenSlots.length - 1; i++) {
    const currentEvent = takenSlots[i];
    const nextEvent = takenSlots[i + 1];

    if (
      (newEventStart < currentEvent.takenEndDate &&
        newEventEnd > currentEvent.takenStartDate) ||
      (newEventStart < nextEvent.takenEndDate &&
        newEventEnd > nextEvent.takenStartDate)
    ) {
      return false;
    }

    if (
      newEventStart === currentEvent.takenEndDate ||
      newEventEnd === nextEvent.takenStartDate
    ) {
      return true;
    }
  }

  return true;
};
