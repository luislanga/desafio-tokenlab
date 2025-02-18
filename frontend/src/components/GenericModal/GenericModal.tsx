import { IoCloseOutline } from "react-icons/io5";
import { Container, ModalHeader } from "./styles";
import { Button } from "../Button/Button";
import { theme } from "../../styles/theme";

interface GenericModalProps {
  title: string;
  children: React.ReactNode;
}

export const GenericModal = ({ title, children }: GenericModalProps) => {
  return (
    <Container>
      <ModalHeader>
        {title && <h2>{title}</h2>}
        <Button
          noPadding
          border="none"
          hoverBorder="none"
          hoverBgColor="transparent"
          hoverTextColor={theme.colors.red}
        >
          <IoCloseOutline size={32} />
        </Button>
      </ModalHeader>
      <div>{children}</div>
    </Container>
  );
};
