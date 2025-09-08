// src/SignOutButton.jsx
import { useAuth } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

export default function SignOutButton() {
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    toast.success("Signed out successfully!");
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
    >
      Sign Out
    </button>
  );
}
