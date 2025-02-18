import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { GenericModal } from "../GenericModal/GenericModal";
import { CustomDatePicker, Form, Input } from "./styles";
import { Button } from "../Button/Button";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import 'react-datepicker/dist/react-datepicker.css'
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

interface CreateEventModalProps {
  startDate: Date | null;
  onClose: () => void;
}

export const CreateEventModal = ({
  startDate,
  onClose,
}: CreateEventModalProps) => {
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
    <GenericModal title="Criar Evento" closer={onClose}>
      {!isPending ? (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Descrição"
          />

          <CustomDatePicker
            timeIntervals={5}
            selected={formData.start}
            onChange={(date) => handleDateChange(date, "start")}
            showTimeSelect
            dateFormat="Pp"
            id="start"
            locale="pt-BR"
          />

          <CustomDatePicker
            selected={formData.end}
            onChange={(date) => handleDateChange(date, "end")}
            showTimeSelect
            dateFormat="Pp"
            id="end"
          />
          <Button type="submit" disabled={isPending}>
            Criar
          </Button>
        </Form>
      ) : (
        <LoadingSpinner />
      )}
    </GenericModal>
  );
};
