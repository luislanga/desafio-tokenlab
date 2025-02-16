export const checkIfTimeRangeIsFree = async (
  newEventStart: number,
  newEventEnd: number,
  takenSlots: any[] //type this later
) => {
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
