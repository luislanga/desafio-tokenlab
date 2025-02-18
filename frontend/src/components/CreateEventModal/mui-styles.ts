import { theme } from "../../styles/theme";

export const dateTimePickerStyles = {
  "& *": {
    fontFamily: theme.fonts.main,
    fontSize: "14px",
    fontWeight: 400,
  },
  "& .MuiInputBase-root": {
    backgroundColor: theme.colors.input_bg,
    borderRadius: "12px",
    fontFamily: "Inter",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.secondary,
  },
  "& .MuiInputLabel-root": {
    color: theme.colors.secondary,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.secondary,
  },
};
