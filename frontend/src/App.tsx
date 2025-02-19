import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Auth } from "./pages/Auth/Auth";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (window.location.search.includes("code=")) {
        // gets query and beyond, checks if it includes code=
        window.history.replaceState(null, "", window.location.pathname); // change browser url to remove cognito's query param
      }
    }
  }, [auth.isAuthenticated]);

  if (auth.isLoading) {
    return <LoadingSpinner color="light" />;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/auth"
          element={
            auth.isAuthenticated ? <Navigate to="/" replace /> : <Auth />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
