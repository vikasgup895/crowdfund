import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "./hooks/useAuthContext";
import api from "./lib/api";

export default function SignInForm() {
  const [flow, setFlow] = useState("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = (formData) => {
    const errors = {};
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
    const firstName = formData.get("firstName")?.trim();

    if (flow === "signUp" && (!firstName || firstName.length < 2)) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const form = new FormData(e.target);

    // Client-side validation
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    const payload =
      flow === "signIn"
        ? {
            email: form.get("email")?.trim(),
            password: form.get("password"),
          }
        : {
            name: form.get("firstName")?.trim(), // ✅ Change to 'name' to match backend
            email: form.get("email")?.trim(),
            password: form.get("password"),
          };

    try {
      const endpoint =
        flow === "signIn" ? "/api/auth/login" : "/api/auth/register";
      const { data } = await api.post(endpoint, payload);

      console.log("Auth response:", data); // Debug log

      if (data?.token) {
        // Store token
        localStorage.setItem("token", data.token);

        // ✅ Ensure user object has consistent structure
        const user = {
          id: data.user?.id || data.user?._id,
          _id: data.user?._id || data.user?.id,
          name: data.user?.name,
          email: data.user?.email,
          role: data.user?.role,
          ...data.user,
        };

        console.log("Processed user object:", user); // Debug log

        // Update auth context with processed user
        login(user);

        toast.success(
          flow === "signIn"
            ? "Signed in successfully!"
            : "Account created successfully!"
        );

        // Navigate based on flow
        setTimeout(() => {
          flow === "signUp" ? navigate("/profile") : navigate("/");
        }, 1000);
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Auth error:", err);

      let message = "An unexpected error occurred";

      if (err.response?.status === 401) {
        message =
          flow === "signIn"
            ? "Invalid email or password"
            : "Account already exists";
      } else if (err.response?.status === 422) {
        message = "Please check your input and try again";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (!navigator.onLine) {
        message = "Please check your internet connection";
      }

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFlowChange = () => {
    setFlow(flow === "signIn" ? "signUp" : "signIn");
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
        noValidate
        aria-label={flow === "signIn" ? "Sign in form" : "Sign up form"}
      >
        {flow === "signUp" && (
          <div>
            <input
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              name="firstName"
              placeholder="First Name"
              autoComplete="given-name"
              required
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.firstName}
              </p>
            )}
          </div>
        )}

        <div>
          <input
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            required
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* ✅ Fixed password field with proper positioning */}
        <div className="relative">
          <input
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete={
              flow === "signIn" ? "current-password" : "new-password"
            }
            required
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          {errors.password && (
            <p
              id="password-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting
            ? flow === "signIn"
              ? "Signing in..."
              : "Creating account..."
            : flow === "signIn"
            ? "Sign In"
            : "Create Account"}
        </button>

        <div className="text-center text-sm text-gray-600">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium focus:outline-none focus:underline"
            onClick={handleFlowChange}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center my-6">
        <hr className="flex-grow border-gray-200" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <button
        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        onClick={() => toast.info("Anonymous login feature coming soon!")}
      >
        Continue as Guest
      </button>
    </div>
  );
}
