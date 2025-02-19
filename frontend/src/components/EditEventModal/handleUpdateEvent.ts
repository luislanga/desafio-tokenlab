import { useToast } from "../../hooks/useToast";

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
    useToast("Evento atualizado com sucesso!", "success");
    onClose();
  } catch (error) {
    useToast("Erro ao criar evento.", "error");
  }
};
