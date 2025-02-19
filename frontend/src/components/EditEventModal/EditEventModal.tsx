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
import { eventValidationSchema } from "../../validation/eventValidationSchema";
import { handleUpdateEvent } from "./handleUpdateEvent";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

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

  const [errors, setErrors] = useState<any>({});
  const { mutateAsync: deleteEventFn, isPending: isDeletePending } =
    useDeleteEvent();
  const { mutateAsync: updateEventFn, isPending: isUpdatePending } =
    useUpdateEvent();

  // REMOVE AFTER MODAL UPDATE
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

    const { error } = eventValidationSchema.validate(formData, {
      abortEarly: false, // check all invalid fields before returning
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      const startUnix = formData.start.getTime();
      const endUnix = formData.end.getTime();
      handleUpdateEvent(
        formData.title,
        startUnix,
        endUnix,
        calendarEventId,
        onClose,
        updateEventFn
      );
    }
  };

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
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

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

            {errors.start && <ErrorMessage>{errors.start}</ErrorMessage>}

            <CustomDatePicker
              selected={formData.end}
              onChange={(date: Date) => handleDateChange(date, "end")}
              showTimeSelect
              dateFormat="Pp"
              id="end"
              placeholderText="Término"
              locale="pt-BR"
            />

            {errors.end && <ErrorMessage>{errors.end}</ErrorMessage>}

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
        <LoadingSpinner color="dark"/>
      )}
    </GenericModal>
  );
};
