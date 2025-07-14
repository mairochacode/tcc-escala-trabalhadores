import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import DashboardOperador from "./components/Dashboard/DashboardOperador";
import DashboardTrabalhador from "./components/Dashboard/DashboardTrabalhador";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-operador" element={<DashboardOperador />} />
        <Route path="/dashboard-trabalhador" element={<DashboardTrabalhador />} />
      </Routes>
    </Router>

  );
}

export default App;
