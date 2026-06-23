import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientHome from "./pages/patient/PatientHome";
import PriseRdvPage from "./pages/patient/PriseRdvPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient/rdv" element={<PriseRdvPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;