import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Form, Input } from "./styles";
import { dateTimePickerStyles } from "./mui-styles";
import { Button } from "../Button/Button";
import { theme } from "../../styles/theme";
import { GenericModal } from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import dayjs from "dayjs";

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
    start: startDate ? dayjs(startDate) : dayjs(), // Make sure it's a Dayjs object
    end: dayjs(),
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        start: dayjs(startDate), // Ensure start is always a Dayjs object
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

  const handleDateChange = (date: any, name: string) => {
    setFormData({
      ...formData,
      [name]: date, // dayjs object
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startUnix = formData.start.valueOf();
    const endUnix = formData.end.valueOf();
    console.log(formData.title, startDate, endUnix)
    handleCreateEvent(formData.title, startUnix, endUnix);
  };

  return (
    <GenericModal closer={onClose} title="Criar Evento">
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Descrição"
          onChange={handleInputChange}
          type="text"
          id="title"
          name="title"
          value={formData.title}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateTimePicker
            value={formData.start}
            onChange={(date) => handleDateChange(date, "start")}
            className="form-control"
            name="start"
            sx={dateTimePickerStyles}
          />
          <DateTimePicker
            value={formData.end}
            onChange={(date) => handleDateChange(date, "end")}
            className="form-control"
            name="end"
            label="Data final"
            sx={dateTimePickerStyles}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          textColor={theme.colors.primary}
          bgColor={theme.colors.secondary}
          hoverBgColor={theme.colors.green}
          hoverTextColor={theme.colors.primary}
          hoverBorder={`1px solid ${theme.colors.green}`}
          disabled={isPending}
        >
          Criar
        </Button>
      </Form>
    </GenericModal>
  );
};
