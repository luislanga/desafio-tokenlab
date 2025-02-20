import { Calendar } from "../../components/Calendar/Calendar";
import { Header } from "../../components/Header/Header";
import { WidthContainer } from "../../components/WidthContainer/WidthContainer";

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <WidthContainer>
        <Calendar />
      </WidthContainer>
    </div>
  );
};
