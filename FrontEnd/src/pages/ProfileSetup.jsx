import { useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import axios from "../lib/api"; // centralized axios instance

export default function ProfileSetup() {
  const { profile } = useAuth();
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("backer");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.firstName || !lastName.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/profile", {
        firstName: profile.firstName,
        lastName: lastName.trim(),
        role,
        bio: bio.trim() || undefined,
      });

      if (res.status === 201 || res.status === 200) {
        setRole("backer");
        setBio("");
        toast.success("Profile created successfully!");
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        toast.error(res.data?.message || "Unexpected response");
      }
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            Tell us a bit about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={profile.firstName}
              disabled
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to *
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="backer"
                  checked={role === "backer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Support campaigns (Backer)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="creator"
                  checked={role === "creator"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Create and manage campaigns (Creator)
                </span>
              </label>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating Profile..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
