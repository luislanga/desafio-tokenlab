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
import dayjs, { Dayjs } from "dayjs";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface CreateEventModalProps {
  startDate: Date | null;
  onClose: () => void;
}

interface FormData {
  title: string;
  start: Dayjs;
  end: Dayjs | null;
}

export const CreateEventModal = ({
  startDate,
  onClose,
}: CreateEventModalProps) => {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    start: startDate ? dayjs(startDate) : dayjs(),
    end: null,
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        start: dayjs(startDate),
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
      [name]: dayjs(date),
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
    const endUnix = formData.end?.valueOf() ?? 0;
    console.log(formData.title, startUnix, endUnix);

    handleCreateEvent(formData.title, startUnix, endUnix);
  };

  return (
    <GenericModal closer={onClose} title="Criar Evento">
      {!isPending ?
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
      : <LoadingSpinner />}
    </GenericModal>
  );
};
