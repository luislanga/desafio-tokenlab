import { Container } from "./styles";
import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  color?: string;
}
export const LoadingSpinner = ({ color }: LoadingSpinnerProps) => {
  return (
    <Container $color={color}>
      <FaSpinner size={36} />
    </Container>
  );
};
