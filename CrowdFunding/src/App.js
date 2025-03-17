import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Campaigns from "./components/Campaigns";
import Profile from "./components/Profile";
import Home from "./components/Home";
import StartCampaign from "./components/StartCampaign";
import CampaignDetails from "./components/CampaignDetails";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/start-campaign" element={<StartCampaign />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/campaign-details" element={<CampaignDetails/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
