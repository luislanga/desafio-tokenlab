import { useAuth } from "react-oidc-context";
import { Button } from "../../components/Button/Button";

export const Auth = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </>
  );
};