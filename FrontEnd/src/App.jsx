import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BrowseCampaigns from "./pages/BrowseCampaigns";
import CampaignDetails from "./pages/CampaignDetails";
import CreateCampaign from "./pages/CreateCampaign";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ProfileSetup from "./pages/ProfileSetup";
import SignInForm from "./SignInForm";
import PaymentPage from "./pages/PaymentPage";
import Footer from "./components/Footer";
export default function App() {
  const { loading, isAuthenticated, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <AuthenticatedApp profile={profile} />
      ) : (
        <UnauthenticatedApp />
      )}
      <ToastContainer />
    </div>
  );
}

function AuthenticatedApp({ profile }) {
  if (!profile) {
    return <ProfileSetup />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/browse" element={<BrowseCampaigns />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/payment/:campaignId" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function UnauthenticatedApp() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-blue-600">CrowdFund</h1>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-600"
                >
                  How it Works
                </a>
                <a href="#about" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fund Your Dreams
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of creators and backers making ideas come to life
              </p>
            </div>
            <SignInForm />
          </div>
        </main>
      </div>
    </>
  );
}
