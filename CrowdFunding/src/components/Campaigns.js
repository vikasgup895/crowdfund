// CampaignsPage.js
import React from "react";
import "./Campaigns.css";
import { Link } from "react-router-dom";
const Campaigns = () => {
  return (
    <div className="campaigns-page">
      {/* Header Section */}
      <header className="campaigns-header">
        <h1>Explore Campaigns</h1>
        <p>Browse and support campaigns that inspire you.</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search for campaigns..."
        />
      </header>

      {/* Filters and Sorting Section */}
      <section className="filters-section">
        <div className="filters">
          <button>All Categories</button>
          <button>Education</button>
          <button>Health</button>
          <button>Environment</button>
          <button>Technology</button>
        </div>
        <div className="sorting">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort">
            <option>Most Funded</option>
            <option>Newly Launched</option>
            <option>Ending Soon</option>
            <option>Popular Campaigns</option>
          </select>
        </div>
      </section>

      {/* Campaign Listing Section */}
      <section className="campaign-listing">
        <h2>All Campaigns</h2>
        <div className="campaign-grid">
          {[...Array(8)].map((_, index) => (
            <div className="campaign-card" key={index}>
              <img
                src={`https://via.placeholder.com/300x200?text=Campaign+${index + 1}`}
                alt="Campaign Thumbnail"
              />
              <h3>Campaign Title {index + 1}</h3>
              <p>
                This is a short description of Campaign {index + 1}. Support and
                make a difference!
              </p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${Math.random() * 100}%` }}
                ></div>
              </div>
              <p className="funding-stats">Raised: $5,000 / $10,000</p>
              <Link to='campaign-details'>
              <button className="btn-primary">View Details</button></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="featured-campaigns">
        <h2>Featured Campaigns</h2>
        <div className="campaign-grid">
          {[...Array(3)].map((_, index) => (
            <div className="campaign-card" key={index}>
              <img
                src={`https://via.placeholder.com/300x200?text=Featured+${index + 1}`}
                alt="Featured Campaign Thumbnail"
              />
              <h3>Featured Campaign {index + 1}</h3>
              <p>
                This is a short description of Featured Campaign {index + 1}.
                Support now!
              </p>
              <button className="btn-secondary">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Have a Great Idea?</h2>
        <p>Start your own campaign and bring your idea to life!</p>
        <button className="btn-primary">Start Campaign</button>
      </section>

      {/* Footer Section */}
      <footer className="campaigns-footer">
        <div className="footer-links">
          <a href="#">Help</a>
          <a href="#">Support</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <p>&copy; 2025 CrowdFunding Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Campaigns;
