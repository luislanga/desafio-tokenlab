import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const ThemeWrapper = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
