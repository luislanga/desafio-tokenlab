import { Calendar } from "../../components/Calendar/Calendar";
import { Header } from "../../components/Header/Header";
import { WidthContainer } from "../../components/WidthContainer/WidthContainer";
import { Container } from "./styles";

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <Container>
        <WidthContainer>
          <Calendar />
        </WidthContainer>
      </Container>
    </div>
  );
};
