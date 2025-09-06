import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">CrowdFund</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Empowering creators and backers to bring innovative ideas to life.
              Join thousands of successful campaigns and make your dreams a
              reality.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.74-9.118c-.269 0-.49-.221-.49-.49s.221-.49.49-.49.49.221.49.49-.221.49-.49.49zm0 0" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Start a Campaign
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "This feature is not yet available. Stay tuned!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "Feature under development. It'll be live shortly!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Creator Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Backer Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "Feature under development. It'll be live shortly!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "This feature is not yet available. Stay tuned!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "Feature under development. It'll be live shortly!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "Feature under development. It'll be live shortly!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "This feature is not yet available. Stay tuned!"
                    );
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Stay Updated
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Get the latest campaigns, success stories, and platform updates
                delivered to your inbox.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form className="sm:flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    if (e.target.email.value) {
                      e.preventDefault();
                      toast.success(
                        "Thanks for subscribing. We'll be in touch soon"
                      );
                    }
                  }}
                  className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <span className="text-gray-600 text-sm">
                Trusted by{" "}
                <span className="text-blue-600 font-semibold">10,000+</span>{" "}
                creators
              </span>
              <span className="text-gray-600 text-sm">
                <span className="text-blue-600 font-semibold">$5M+</span> raised
              </span>
              <span className="text-gray-600 text-sm">
                <span className="text-blue-600 font-semibold">99.9%</span>{" "}
                uptime
              </span>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-sm text-gray-600">
                &copy; 2025 CrowdFund. All rights reserved. Made with ❤️ by
                Vikas Gupta for creators worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
