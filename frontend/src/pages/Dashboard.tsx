import { useAuth } from "react-oidc-context";
import Calendar from "../components/Calendar";

const Dashboard = () => {
  const signOutRedirect = () => {
    const clientId = "360ao3a7d50qe9u2lo998o8ljf";
    const logoutUri = "http://localhost:5173/auth";
    const cognitoDomain =
      "https://tokenlab-calendar.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const auth = useAuth();

  const handleSignOut = () => {
    auth.removeUser();
    signOutRedirect();
  };

  return (
    <div>
      <Calendar />
      <div>
        <h2>Authenticated</h2>
        <button onClick={() => handleSignOut()}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;
