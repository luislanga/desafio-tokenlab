export const handleUpdateEvent = async (
  title: string,
  startUnix: number,
  endUnix: number,
  calendarEventId: string,
  onClose: () => void,
  updateEventFn: (data: {
    title: string;
    start: string;
    end: string;
    calendarEventId: string;
  }) => Promise<void>
) => {
  try {
    const eventData = {
      title,
      start: String(startUnix),
      end: String(endUnix),
      calendarEventId,
    };
    await updateEventFn(eventData);
    alert("Evento atualizado com sucesso!");
    onClose();
  } catch (error) {
    alert("Erro ao atualizar evento.");
  }
};
