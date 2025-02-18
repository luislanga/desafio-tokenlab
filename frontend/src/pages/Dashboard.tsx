import Header from "../components/Header/Header";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { WidthContainer } from "../components/WidthContainer/WidthContainer";
import { Calendar } from "../components/Calendar/Calendar";

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <WidthContainer>
        <PageTitle>Dashboard</PageTitle>
        <Calendar />
      </WidthContainer>
    </div>
  );
};
