import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Form, Input } from "./styles";
import { dateTimePickerStyles } from "./mui-styles";
import { Button } from "../Button/Button";
import { theme } from "../../styles/theme";
import { GenericModal } from "../GenericModal/GenericModal";

export const CreateEventModal = () => {
  return (
    <GenericModal title="Criar Evento">
      <Form>
        <Input placeholder="Descrição" />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateTimePicker label="Data inicial" sx={dateTimePickerStyles} />
          <DateTimePicker label="Data final" sx={dateTimePickerStyles} />
        </LocalizationProvider>
        <Button
          type="submit"
          textColor={theme.colors.primary}
          bgColor={theme.colors.secondary}
          hoverBgColor={theme.colors.green}
          hoverTextColor={theme.colors.primary}
          hoverBorder={`1px solid ${theme.colors.green}`}
          disabled={false}
        >
          Criar
        </Button>
      </Form>
    </GenericModal>
  );
};
