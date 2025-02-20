import { IoCloseOutline } from "react-icons/io5";
import { Container, ModalHeader, Overlay } from "./styles";
import { Button } from "../Button/Button";
import { theme } from "../../styles/theme";

interface GenericModalProps {
  title: string;
  children: React.ReactNode;
  closer: () => void;
  isSubmitting?: boolean
}

export const GenericModal = ({
  closer,
  title,
  children,
  isSubmitting = false
  
}: GenericModalProps) => {
  return (
    <>
      <Overlay onClick={!isSubmitting ? closer : undefined} />
      <Container>
        <ModalHeader>
          {title && <h2>{title}</h2>}
          <Button
            $noPadding
            $border="none"
            $hoverBorder="none"
            $hoverBgColor="transparent"
            $hoverTextColor={theme.colors.red}
            onClick={closer}
            disabled={isSubmitting}
          >
            <IoCloseOutline size={32} />
          </Button>
        </ModalHeader>
        {children}
      </Container>
    </>
  );
};
