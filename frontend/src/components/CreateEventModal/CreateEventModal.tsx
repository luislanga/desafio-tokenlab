import { useState, useRef } from "react";
import { registerLocale } from "react-datepicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { GenericModal } from "../GenericModal/GenericModal";
import {
  Container,
  CustomDatePicker,
  Form,
  Input,
} from "./styles";
import { Button } from "../Button/Button";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { handleCreateEvent } from "./handleCreateEvent";
import { eventValidationSchema } from "../../validation/eventValidationSchema";

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
    end: null as Date | null,
  });
  const [errors, setErrors] = useState<any>({});
  const { mutateAsync: createEventFn, isPending } = useCreateEvent();
  const formRef = useRef<HTMLFormElement | null>(null);

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
      abortEarly: false, // all invalid fields before returning
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      if (formData.end === null) {
        const endUnix = new Date().getTime();
        handleCreateEvent(
          formData.title,
          formData.start.getTime(),
          endUnix,
          onClose,
          createEventFn
        );
      } else {
        const startUnix = formData.start.getTime();
        const endUnix = formData.end.getTime();
        handleCreateEvent(
          formData.title,
          startUnix,
          endUnix,
          onClose,
          createEventFn
        );
      }
    }
  };

  return (
    <GenericModal title="Criar Evento" closer={onClose}>
      {!isPending ? (
        <Container>
          <Form ref={formRef}>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Descrição"
            />
            {errors.title && (
              <ErrorMessage className="error">{errors.title}</ErrorMessage>
            )}

            <CustomDatePicker
              timeIntervals={5}
              selected={formData.start}
              onChange={(date: any) => handleDateChange(date, "start")}
              showTimeSelect
              dateFormat="Pp"
              id="start"
              placeholderText="Início"
              locale="pt-BR"
            />
            {errors.start && (
              <ErrorMessage className="error">{errors.start}</ErrorMessage>
            )}

            <CustomDatePicker
              selected={formData.end}
              onChange={(date: any) => handleDateChange(date, "end")}
              showTimeSelect
              dateFormat="Pp"
              id="end"
              placeholderText="Término"
              locale="pt-BR"
            />
            {errors.end && (
              <ErrorMessage className="error">{errors.end}</ErrorMessage>
            )}
          </Form>

          <Button type="button" disabled={isPending} onClick={handleSubmit}>
            Criar
          </Button>
        </Container>
      ) : (
        <LoadingSpinner color="dark" />
      )}
    </GenericModal>
  );
};
