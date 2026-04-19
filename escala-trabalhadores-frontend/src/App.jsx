import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import DashboardOperador from "./pages/DashboardOperador";
import DashboardTrabalhador from "./pages/DashboardTrabalhador";

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard-operador"
          element={
            <PrivateRoute>
              <DashboardOperador />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard-trabalhador"
          element={
            <PrivateRoute>
              <DashboardTrabalhador />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
