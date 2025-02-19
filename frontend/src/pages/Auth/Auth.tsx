import { useAuth } from "react-oidc-context";
import { Button } from "../../components/Button/Button";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export const Auth = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <LoadingSpinner color="light"/>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <>
      <Button onClick={() => auth.signinRedirect()}>Entrar</Button>
    </>
  );
};