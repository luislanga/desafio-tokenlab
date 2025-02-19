import { errorMessages, successMessages } from "../../responses/responseMessages";
import { useToast } from "../../hooks/useToast";

export const handleCreateEvent = async (
  title: string,
  startUnix: number,
  endUnix: number,
  onClose: () => void,
  createEventFn: (data: {
    title: string;
    start: string;
    end: string;
  }) => Promise<void>
) => {
  try {
    const response: any = await createEventFn({
      title,
      start: String(startUnix),
      end: String(endUnix),
    });
    const successCode = response?.message
    const successMessage = successMessages[successCode] || "Evento criado com sucesso!";
    useToast(successMessage, "success");
    onClose();
  } catch (error: any) {
    const errorCode = error.response?.data?.message
    const errorMessage = errorMessages[errorCode] || "Erro ao criar evento."
    useToast(errorMessage, "error");
  }
};
