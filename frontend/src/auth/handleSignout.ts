import { AuthContextProps } from "react-oidc-context";

const signOutRedirect = () => {
  const clientId = "360ao3a7d50qe9u2lo998o8ljf";
  const logoutUri = "http://localhost:5173/auth";
  const cognitoDomain =
    "https://tokenlab-calendar.auth.us-east-1.amazoncognito.com";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};

export const handleSignOut = (auth: AuthContextProps ) => {
  auth.removeUser();
  signOutRedirect();
};
