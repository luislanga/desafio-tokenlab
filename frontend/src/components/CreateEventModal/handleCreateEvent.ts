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
    alert("Evento criado com sucesso!");
    onClose();
  } catch (error) {
    alert("Erro ao criar evento.");
  }
};
