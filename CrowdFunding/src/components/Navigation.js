import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navigation = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Check if the user is logged in by checking if there's a token in localStorage
  const isLoggedIn = !!localStorage.getItem("userToken");

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem("userToken");
    window.location.href = "/"; // Redirect to the home page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CrowdFund</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/campaigns">Campaigns</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

      {/* Conditional rendering of Start Campaign or Login/Signup */}
      {isLoggedIn ? (
        // Show user icon with dropdown when logged in
        <div className="navbar-user">
          <div className="user-icon" onClick={toggleDropdown}>
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="user-icon-img"
            />
          </div>
          {dropdownVisible && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        // Show login/signup button if not logged in
        <button className="navbar-button">
          <Link to="/login">Login / SignUp</Link>
        </button>
      )}

      {/* Start a Campaign button */}
      <button className="navbar-button">
        <Link to="/start-campaign">Start a Campaign</Link>
      </button>
    </nav>
  );
};

export default Navigation;
