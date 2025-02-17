import { useAuth } from "react-oidc-context";
import Cookies from "js-cookie";

const Auth = () => {
  const { user, isAuthenticated, signinRedirect, signoutRedirect } = useAuth();

  // Store the JWT in cookies after authentication
  if (isAuthenticated && user) {
    Cookies.set("jwt", user.id_token || "", { expires: 7 }); // Set cookie with a 7-day expiry
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Authenticated</h2>
          <pre>{user?.profile?.email}</pre>
          <button onClick={() => signoutRedirect()}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please Log In</h2>
          <button onClick={() => signinRedirect()}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
