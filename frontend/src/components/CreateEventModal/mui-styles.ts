import { theme } from "../../styles/theme";

export const dateTimePickerStyles = {
  "& .MuiInputLabel-root": {
    fontFamily: theme.fonts.main || "Inter",
    fontSize: "14px",
    fontWeight: 400,
    color: theme.colors.secondary,
  },
  "& .MuiInputBase-root": {
    backgroundColor: theme.colors.input_bg,
    borderRadius: "12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.secondary,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.secondary,
  },
};
