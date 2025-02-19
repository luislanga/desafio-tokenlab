import { useToast } from "../../hooks/useToast";
import { errorMessages, successMessages } from "../../responses/responseMessages";

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
    const response: any = await updateEventFn(eventData);
    const successCode = response?.message
    const successMessage = successMessages[successCode] || "Evento atualizado com sucesso!";
    useToast(successMessage, "success");
    onClose();
  } catch (error: any) {
    const errorCode = error.response?.data?.message
    const errorMessage = errorMessages[errorCode] || "Erro ao atualizar evento."
    useToast(errorMessage, "error");
  }
};
