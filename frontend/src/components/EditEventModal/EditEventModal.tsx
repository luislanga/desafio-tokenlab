import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import { GenericModal } from "../GenericModal/GenericModal";
import { CustomDatePicker, Form, Input } from "./styles";
import { Button } from "../Button/Button";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import { theme } from "../../styles/theme";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";

registerLocale("pt-BR", ptBR);

interface UpdateEventModalProps {
  title: string;
  startDate: number;
  endDate: number;
  calendarEventId: string;
  onClose: () => void;
}

export const UpdateEventModal = ({
  title,
  startDate,
  endDate,
  calendarEventId,
  onClose,
}: UpdateEventModalProps) => {
  const [formData, setFormData] = useState({
    title,
    start: new Date(startDate),
    end: new Date(endDate),
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        start: new Date(startDate),
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
    handleUpdateEvent(formData.title, startUnix, endUnix, calendarEventId);
  };

  const { mutateAsync: updateEventFn, isPending: isUpdatePending } =
    useUpdateEvent();

  const handleUpdateEvent = async (
    title: string,
    startUnix: number,
    endUnix: number,
    calendarEventId: string
  ) => {
    try {
      const eventData = {
        title,
        start: String(startUnix),
        end: String(endUnix),
        calendarEventId,
      };
      await updateEventFn(eventData);
      alert("Evento atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert("Erro ao atualizar evento.");
    }
  };

  const { mutateAsync: deleteEventFn, isPending: isDeletePending } =
    useDeleteEvent();

  const handleDeleteEvent = async (calendarEventId: string) => {
    try {
      await deleteEventFn(calendarEventId);
      alert("Evento excluido com sucesso!");
      onClose();
    } catch (error) {
      alert("Erro ao excluir evento.");
    }
  };

  return (
    <GenericModal title="Atualizar Evento" closer={onClose}>
      {!isUpdatePending && !isDeletePending ? (
        <>
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
              onChange={(date: Date) => handleDateChange(date, "start")}
              showTimeSelect
              dateFormat="Pp"
              id="start"
              placeholderText="Início"
              locale="pt-BR"
            />

            <CustomDatePicker
              selected={formData.end}
              onChange={(date: Date) => handleDateChange(date, "end")}
              showTimeSelect
              dateFormat="Pp"
              id="end"
              placeholderText="Término"
              locale="pt-BR"
            />
            <Button type="submit" disabled={isUpdatePending}>
              Atualizar
            </Button>
          </Form>
          <Button
            $bgColor={theme.colors.red}
            $border={`1px solid ${theme.colors.red}`}
            $hoverBorder={`1px solid ${theme.colors.red}`}
            $hoverBgColor="transparent"
            $textColor="white"
            $hoverTextColor={theme.colors.red}
            onClick={() => {
              handleDeleteEvent(calendarEventId);
            }}
          >
            Excluir Evento
          </Button>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </GenericModal>
  );
};
