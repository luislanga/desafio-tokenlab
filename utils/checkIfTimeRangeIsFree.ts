export const checkIfTimeRangeIsFree = async (
  newEventStart: number,
  newEventEnd: number,
  takenSlots: { id?: string; takenStartDate: number; takenEndDate: number }[], 
  currentEventId?: string
) => {
  for (let i = 0; i < takenSlots.length; i++) {
    const currentEvent = takenSlots[i];
    if (
      (!currentEventId || currentEvent.id !== currentEventId) &&
      newEventStart < currentEvent.takenEndDate &&
      newEventEnd > currentEvent.takenStartDate
    ) {
      return false;
    }
  }
  return true;
};
