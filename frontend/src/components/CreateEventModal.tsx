import { useEffect, useState } from "react";
import { useCreateEvent } from "../hooks/useEvents";

interface CreateEventModalProps {
  startDate: Date | null; // Prop for the start date
  onClose: () => void; // Close the modal
}

const CreateEventModal = ({ startDate, onClose }: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    start: startDate ? startDate.toISOString().slice(0, 16) : "",
    end: "",
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        start: startDate.toISOString().slice(0, 16),
      }));
    }
  }, [startDate]);

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
    handleCreateEvent(formData.title, startUnix, endUnix);
  };

  const { mutateAsync: createEventFn, isPending } = useCreateEvent();

  const handleCreateEvent = async (
    title: string,
    startUnix: number,
    endUnix: number
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

export default CreateEventModal;
