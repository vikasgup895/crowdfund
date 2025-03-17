// Import necessary libraries
import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
const Home= () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="hero-banner">
        <h1>Empowering Ideas Through Community Support!</h1>
        <p>Join us to fund projects that matter and make a difference.</p>
        <div className="cta-buttons">
        <Link to="/start-campaign">
            <button className="btn-primary">Start a Campaign</button>
          </Link>
          <Link to="/Campaigns">
          <button className="btn-secondary">Explore Campaigns</button>
           </Link>
        </div>
      </header>

      {/* Highlighted Campaigns Section */}
      <section className="highlighted-campaigns">
        <h2>Featured Campaigns</h2>
        <div className="campaign-grid">
          {/* Example campaigns */}
          <div className="campaign-card">
            <img src="https://via.placeholder.com/300" alt="Campaign 1" />
            <h3>Save the Oceans</h3>
            <p>Help us clean the oceans and protect marine life.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '75%' }}></div>
            </div>
            <p>75% funded</p>
          </div>

          <div className="campaign-card">
            <img src="https://via.placeholder.com/300" alt="Campaign 2" />
            <h3>Education for All</h3>
            <p>Providing free education to underprivileged children.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '60%' }}></div>
            </div>
            <p>60% funded</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Start a Campaign</h3>
            <p>Share your idea and set your funding goal.</p>
          </div>
          <div className="step">
            <h3>2. Support a Cause</h3>
            <p>Browse campaigns and back the ones you care about.</p>
          </div>
          <div className="step">
            <h3>3. Achieve Goals</h3>
            <p>Watch ideas turn into reality with your support!</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <h3>Global Reach</h3>
            <p>Access campaigns and backers from around the world.</p>
          </div>
          <div className="benefit">
            <h3>Secure Transactions</h3>
            <p>Enjoy a safe and reliable platform for crowdfunding.</p>
          </div>
          <div className="benefit">
            <h3>Easy to Use</h3>
            <p>Launch your campaign in just a few clicks.</p>
          </div>
        </div>
      </section>

      {/* Explore Campaigns Section */}
      <section className="explore-campaigns">
        <h2>Explore Campaigns</h2>
        <div className="filters">
          <button>Most Funded</button>
          <button>Ending Soon</button>
          <button>Newly Launched</button>
        </div>
        <input type="text" placeholder="Search campaigns..." className="search-bar" />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Thanks to this platform, my project became a reality!"</p>
            <h4>- Alex</h4>
          </div>
          <div className="testimonial-card">
            <p>"Supporting causes has never been easier and more impactful."</p>
            <h4>- Maria</h4>
          </div>
        </div>
      </section>

      {/* Fundraising Statistics Section */}
      <section className="statistics">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat">
            <h3>$10M+</h3>
            <p>Funds Raised</p>
          </div>
          <div className="stat">
            <h3>1,000+</h3>
            <p>Successful Campaigns</p>
          </div>
          <div className="stat">
            <h3>50K+</h3>
            <p>Backers Worldwide</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">FAQs</a>
          <a href="#">Help & Support</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <p>&copy; 2025 CrowdFunding Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Home;
