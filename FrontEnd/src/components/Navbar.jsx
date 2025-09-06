// src/components/Navbar.jsx - Update the imports and component
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import SignOutButton from "../SignOutButton";
import userImage from "../assets/user.png";

export default function Navbar() {
  const location = useLocation();
  const { profile, loading } = useAuth(); // Use context instead of separate API call

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition ${
        isActive(to)
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center mt-2 mb-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CrowdFund
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/browse">Browse Campaigns</NavLink>

            {profile?.role === "creator" && (
              <NavLink to="/create">Create Campaign</NavLink>
            )}

            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-gray-500 text-sm">Loading...</span>
            ) : profile ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                >
                  <img
                    src={profile.avatar || userImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-gray-700 font-semibold">
                    {profile.firstName || "User"}
                  </span>
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
