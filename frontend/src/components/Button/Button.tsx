import { useTheme } from "styled-components";
import { Container } from "./styles";
import { theme } from "../../styles/theme";

type ButtonProps = {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  hoverTextColor?: string;
  hoverBgColor?: string;
  border?: string;
  hoverBorder?: string;
  disabled?: boolean;
  [key: string]: any;
};

export const Button = ({
  children,
  onClick,
  textColor = theme.colors.secondary,
  bgColor = theme.colors.primary,
  hoverTextColor = theme.colors.primary,
  hoverBgColor = theme.colors.secondary,
  border = `1px solid ${theme.colors.secondary}`,
  hoverBorder = `1px solid ${theme.colors.secondary}`,
  disabled = false,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  const buttonTextColor = textColor || theme.colors.secondary;

  return (
    <Container
      $textColor={buttonTextColor}
      $bgColor={bgColor}
      $hoverTextColor={hoverTextColor}
      $hoverBgColor={hoverBgColor}
      $border={border}
      $hoverBorder={hoverBorder}
      $disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </Container>
  );
};
