import { AuthContextProps } from "react-oidc-context";

const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};

export const handleSignOut = (auth: AuthContextProps ) => {
  auth.removeUser();
  signOutRedirect();
};
