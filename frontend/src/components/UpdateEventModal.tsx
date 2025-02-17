import { useState } from "react";
import { useUpdateEvent } from "../hooks/useEvents";

const UpdateEventModal = ({ event, onClose }: any) => {
  const [formData, setFormData] = useState({
    calendarEventId: event.calendarEventId,
    title: event.title,
    start: new Date(event.start).toISOString().slice(0, 16),
    end: new Date(event.end).toISOString().slice(0, 16)
    ,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startUnix = new Date(formData.start).getTime();
    const endUnix = new Date(formData.end).getTime();
    handleUpdateEvent(formData.title, startUnix, endUnix, formData.calendarEventId);
  };
  const { mutateAsync: updateEventFn, isPending } = useUpdateEvent();

  const handleUpdateEvent = async (
    title: string,
    startUnix: number,
    endUnix: number,
    calendarEventId: string
  ) => {
    try {
      await updateEventFn({
        title,
        start: String(startUnix),
        end: String(endUnix),
        calendarEventId
      });
      alert("Evento atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert("Erro ao atualizar evento.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="date">Start:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
          />

          <label htmlFor="date">End:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateEventModal;
