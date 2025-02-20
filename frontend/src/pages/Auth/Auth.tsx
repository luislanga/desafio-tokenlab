import { useAuth } from "react-oidc-context";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { LoginTitleComponent } from "../../components/LoginTitleComponent/LoginTitleComponent";
import { Container } from "./styles";
import { WidthContainer } from "../../components/WidthContainer/WidthContainer";

export const Auth = () => {
  const auth = useAuth();

  if (auth.isLoading || auth.isAuthenticated) {
    return (
      <Container>
        <LoadingSpinner color="light" />
      </Container>
    );
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  return (
    <WidthContainer>
      <Container>
        <LoginTitleComponent onClick={() => auth.signinRedirect()} />
      </Container>
    </WidthContainer>
  );
};
