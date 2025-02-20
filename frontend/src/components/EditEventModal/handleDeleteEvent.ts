import { useToast } from "../../hooks/useToast";
import {
  errorMessages,
  successMessages,
} from "../../responses/responseMessages";

export const handleDeleteEvent = async (
  calendarEventId: string,
  deleteEventFn: (calendarEventId: string) => Promise<void>,
  onClose: () => void
) => {
  try {
    const response: any = await deleteEventFn(calendarEventId);
    const successCode = response?.message;
    const successMessage =
      successMessages[successCode] || "Evento excluído com sucesso!";
    useToast(successMessage, "success");
    onClose();
  } catch (error: any) {
    const errorCode = error.response?.data?.message;
    const errorMessage = errorMessages[errorCode] || "Erro ao excluir evento.";
    useToast(errorMessage, "error");
  }
};
