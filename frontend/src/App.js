import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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
import AdminHome from "./pages/admin/AdminHome";
import RechercheMedicamentPage from "./pages/RechercheMedicamentPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/carte" element={<CartePharmaciePage />} />
          <Route path="/recherche-medicament" element={<RechercheMedicamentPage />} />

          {/* Routes Patient */}
          <Route path="/patient" element={<ProtectedRoute role="patient"><PatientHome /></ProtectedRoute>} />
          <Route path="/patient/rdv" element={<ProtectedRoute role="patient"><PriseRdvPage /></ProtectedRoute>} />
          <Route path="/patient/ordonnances" element={<ProtectedRoute role="patient"><OrdonnancesPage /></ProtectedRoute>} />
          <Route path="/patient/dossier" element={<ProtectedRoute role="patient"><DossierPage /></ProtectedRoute>} />
          <Route path="/patient/commande" element={<ProtectedRoute role="patient"><CommandePage /></ProtectedRoute>} />

          {/* Routes Médecin */}
          <Route path="/medecin" element={<ProtectedRoute role="medecin"><MedecinHome /></ProtectedRoute>} />
          <Route path="/medecin/ordonnance" element={<ProtectedRoute role="medecin"><OrdonnancePage /></ProtectedRoute>} />
          <Route path="/medecin/video" element={<ProtectedRoute role="medecin"><VideoConsultationPage /></ProtectedRoute>} />
          <Route path="/medecin/planning" element={<ProtectedRoute role="medecin"><PlanningPage /></ProtectedRoute>} />
          <Route path="/medecin/patients" element={<ProtectedRoute role="medecin"><PatientsListPage /></ProtectedRoute>} />
          <Route path="/medecin/messagerie" element={<ProtectedRoute role="medecin"><MessagerieMedecinPage /></ProtectedRoute>} />
          <Route path="/medecin/statistiques" element={<ProtectedRoute role="medecin"><StatistiquesPage /></ProtectedRoute>} />

          {/* Routes Pharmacien */}
          <Route path="/pharmacien" element={<ProtectedRoute role="pharmacien"><PharmacienHome /></ProtectedRoute>} />
          <Route path="/pharmacien/stock" element={<ProtectedRoute role="pharmacien"><StockPage /></ProtectedRoute>} />
          <Route path="/pharmacien/commandes" element={<ProtectedRoute role="pharmacien"><CommandesPharmacienPage /></ProtectedRoute>} />
          <Route path="/pharmacien/messagerie" element={<ProtectedRoute role="pharmacien"><MessageriePharmacienPage /></ProtectedRoute>} />

          {/* Routes Admin */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;