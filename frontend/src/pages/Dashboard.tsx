import Header from "../components/Header/Header";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { WidthContainer } from "../components/WidthContainer/WidthContainer";
import { CreateEventModal } from "../components/CreateEventModal/CreateEventModal";
import { GenericModal } from "../components/GenericModal/GenericModal";

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <WidthContainer>
        <PageTitle>Dashboard</PageTitle>
        <CreateEventModal />
      </WidthContainer>
    </div>
  );
};
