import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";  // Import the useAuth hook from react-oidc-context
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;