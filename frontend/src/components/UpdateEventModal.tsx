import { useState } from "react";
import { useUpdateEvent } from "../hooks/useEvents";
import DatePicker from "react-datepicker";

const UpdateEventModal = ({ event, onClose }: any) => {
  const [formData, setFormData] = useState({
    calendarEventId: event.calendarEventId,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date, field: "start" | "end") => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startUnix = formData.start.getTime();
    const endUnix = formData.end.getTime();
    handleUpdateEvent(
      formData.title,
      startUnix,
      endUnix,
      formData.calendarEventId
    );
  };

  const { mutateAsync: updateEventFn, isPending }: any = useUpdateEvent();

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
        calendarEventId,
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

          <label htmlFor="start">Start:</label>
          <DatePicker
            selected={formData.start}
            onChange={(date) => handleDateChange(date as Date, "start")}
            showTimeSelect
            dateFormat="Pp"
            id="start"
          />

          <label htmlFor="end">End:</label>
          <DatePicker
            selected={formData.end}
            onChange={(date) => handleDateChange(date as Date, "end")}
            showTimeSelect
            dateFormat="Pp"
            id="end"
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEventModal;
