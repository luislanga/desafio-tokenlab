import { BsCalendar2Week } from "react-icons/bs";
import { Container, LogoContainer } from "./styles";
import { LoginButtonComponent } from "../LoginButton/LoginButton";

type LoginButtonProps = {
  [key: string]: any;
};

export const LoginTitleComponent = ({ onClick }: LoginButtonProps) => {
  return (
    <Container>
      <LogoContainer>
        <BsCalendar2Week /> tokenlab-calendar
      </LogoContainer>
      <LoginButtonComponent onClick={onClick} />
    </Container>
  );
};
