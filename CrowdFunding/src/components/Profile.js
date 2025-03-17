
import React, { useState } from "react";
import "./ProfilePage.css";
import "./HomePage.css"
import Footer from "./Footer";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("contributions");
  const renderContent = () => {
    switch (activeTab) {
      case "contributions":
        return <p>You have backed 10 campaigns so far. Keep supporting amazing ideas!</p>;
      case "created":
        return <p>You have created 2 campaigns. Check their progress here!</p>;
      case "saved":
        return <p>Here are your saved campaigns for future contributions.</p>;
      case "transactions":
        return <p>View your transaction history here.</p>;
      default:
        return <p>Select a tab to view its content.</p>;
    }
  };
  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-picture"
          />
          <div>
            <h2>John Doe</h2>
            <p>Email: johndoe@example.com</p>
          </div>
        </div>
        <button className="edit-button">Edit Profile</button>
      </div>

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === "contributions" ? "active-tab" : ""}
          onClick={() => setActiveTab("contributions")}
        >
          Contributions
        </button>
        <button
          className={activeTab === "created" ? "active-tab" : ""}
          onClick={() => setActiveTab("created")}
        >
          Created Campaigns
        </button>
        <button
          className={activeTab === "saved" ? "active-tab" : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved Campaigns
        </button>
        <button
          className={activeTab === "transactions" ? "active-tab" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          Transaction History
        </button>
      </div>

      {/* Content Section */}
      <div className="tab-content">{renderContent()}</div>
        <Footer/>
    </div>
  );
};

export default Profile;
