import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientHome from "./pages/patient/PatientHome";
import PriseRdvPage from "./pages/patient/PriseRdvPage";
import OrdonnancesPage from "./pages/patient/OrdonnancesPage";
import DossierPage from "./pages/patient/DossierPage";
import CommandePage from "./pages/patient/CommandePage";
import MedecinHome from "./pages/medecin/MedecinHome";
import OrdonnancePage from "./pages/medecin/OrdonnancePage";
import VideoConsultationPage from "./pages/medecin/VideoConsultationPage";
import PlanningPage from "./pages/medecin/PlanningPage";
import PatientsListPage from "./pages/medecin/PatientsListPage";
import MessagerieMedecinPage from "./pages/medecin/MessagerieMedecinPage";
import StatistiquesPage from "./pages/medecin/StatistiquesPage";
import CartePharmaciePage from "./pages/CartePharmaciePage";
import PharmacienHome from "./pages/pharmacien/PharmacienHome";
import StockPage from "./pages/pharmacien/StockPage";
import CommandesPharmacienPage from "./pages/pharmacien/CommandesPharmacienPage";
import MessageriePharmacienPage from "./pages/pharmacien/MessageriePharmacienPage";
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
        <Route path="/patient/commande" element={<CommandePage />} />
        <Route path="/medecin" element={<MedecinHome />} />
        <Route path="/medecin/ordonnance" element={<OrdonnancePage />} />
        <Route path="/medecin/video" element={<VideoConsultationPage />} />
        <Route path="/medecin/planning" element={<PlanningPage />} />
        <Route path="/medecin/patients" element={<PatientsListPage />} />
        <Route path="/medecin/messagerie" element={<MessagerieMedecinPage />} />
        <Route path="/medecin/statistiques" element={<StatistiquesPage />} />
        <Route path="/carte" element={<CartePharmaciePage />} />
        <Route path="/pharmacien" element={<PharmacienHome />} />
        <Route path="/pharmacien/stock" element={<StockPage />} />
        <Route path="/pharmacien/commandes" element={<CommandesPharmacienPage />} />
        <Route path="/pharmacien/messagerie" element={<MessageriePharmacienPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;