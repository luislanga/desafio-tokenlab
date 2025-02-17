import { useDeleteEvent } from "../hooks/useEvents";

const DeleteEventModal = ({ event, onClose }: any) => {
  const { mutateAsync: deleteEventFn, isPending } = useDeleteEvent();

  const handleDeleteEvent = async () => {
    try {
      await deleteEventFn(event.calendarEventId);
      alert("Evento excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir evento.");
    }
  };

  return (
    <div>
      <button onClick={handleDeleteEvent}>Excluir</button>
    </div>
  );
};

export default DeleteEventModal;
