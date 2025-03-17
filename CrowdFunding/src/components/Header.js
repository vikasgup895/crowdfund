
import React from "react";
import "./Header.css";
const Header = ({ title, description, showSearchBar, onSearch }) => {
    return (
      <header className="header">
        <h1>{title}</h1>
        <p>{description}</p>
        {showSearchBar && (
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={onSearch}
          />
        )}
      </header>
    );
  };
  
  export default Header;