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
    await createEventFn({
      title,
      start: String(startUnix),
      end: String(endUnix),
    });
    useToast("Evento criado com sucesso!", "success");
    onClose();
  } catch (error) {
    useToast("Erro ao criar evento.", "error");
  }
};
