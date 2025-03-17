import React from "react";
import "./About.css";
import Footer from "./Footer"
const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About CrowdFund</h1>
        <p>Your trusted platform for bringing ideas to life.</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At CrowdFund, we believe that every great idea deserves a chance to
            succeed. Our platform empowers innovators, creators, and dreamers to
            connect with a global audience and turn their ideas into reality.
          </p>
        </div>
        <div className="about-section">
          <h2>How It Works</h2>
          <p>
            Whether you're looking to launch a project or support a cause, our
            simple and secure platform ensures transparency and reliability:
          </p>
          <ul>
            <li>Project creators set goals and share their vision.</li>
            <li>Backers contribute to projects they believe in.</li>
            <li>We ensure secure payment processing and updates.</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Join Us</h2>
          <p>
            Become part of a community that's shaping the future. Whether you're
            creating or supporting, CrowdFund is your partner in innovation.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
