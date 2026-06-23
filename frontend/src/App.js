import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientHome from "./pages/patient/PatientHome";
import PriseRdvPage from "./pages/patient/PriseRdvPage";
import OrdonnancesPage from "./pages/patient/OrdonnancesPage";
import DossierPage from "./pages/patient/DossierPage";
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
        <Route path="/patient/ordonnances" element={<OrdonnancesPage />} />
        <Route path="/patient/dossier" element={<DossierPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;