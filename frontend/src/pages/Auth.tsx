import { useAuth } from "react-oidc-context";

const Auth = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
};

export default Auth;
