import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { GenericModal } from "../GenericModal/GenericModal";
import { CustomDatePicker, Form, Input } from "./styles";
import { Button } from "../Button/Button";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import Joi from "joi";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

registerLocale("pt-BR", ptBR);

interface CreateEventModalProps {
  startDate: Date | null;
  onClose: () => void;
}

const createEventValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Título é obrigatório",
  }),
  start: Joi.date().iso().required().messages({
    "date.base": "Data de início é inválida",
  }),
  end: Joi.date().iso().greater(Joi.ref("start")).required().messages({
    "date.base": "Data de término é inválida",
    "date.greater": "Data de término deve ser maior que a data de início",
  }),
});

export const CreateEventModal = ({
  startDate,
  onClose,
}: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    start: startDate || new Date(),
    end: null as Date | null,
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

  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { error } = createEventValidationSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      if (formData.end === null) {
        const endUnix = new Date().getTime();
        handleCreateEvent(formData.title, formData.start.getTime(), endUnix);
      } else {
        const startUnix = formData.start.getTime();
        const endUnix = formData.end.getTime();
        handleCreateEvent(formData.title, startUnix, endUnix);
      }
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
          {errors.title && <ErrorMessage className="error">{errors.title}</ErrorMessage>}

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
           {errors.start && <ErrorMessage className="error">{errors.start}</ErrorMessage>}

          <CustomDatePicker
            selected={formData.end}
            onChange={(date: any) => handleDateChange(date, "end")}
            showTimeSelect
            dateFormat="Pp"
            id="end"
            placeholderText="Término"
            locale="pt-BR"
          />
          {errors.end && <ErrorMessage className="error">{errors.end}</ErrorMessage>}
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
