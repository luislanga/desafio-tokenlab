import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useCreateEvent } from "../hooks/useEvents";

interface CreateEventModalProps {
  startDate: Date | null;
  onClose: () => void;
}

const CreateEventModal = ({ startDate, onClose }: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    start: startDate || new Date(),
    end: new Date(),
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        start: startDate,
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

  const handleDateChange = (date: Date, name: string) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startUnix = formData.start.getTime();
    const endUnix = formData.end.getTime();
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
          {isPending ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventModal;
