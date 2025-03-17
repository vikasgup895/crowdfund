// <Link to={`/campaign-details/${id}`}></Link> in link this statement to be present for each user

import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import "./CampaignCard.css";

const CampaignCard = ({ id, image, title, description, progress, raised, goal }) => {
  return (
    <div className="campaign-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="funding-stats">Raised: ${raised} / ${goal}</p>
      <Link to={`/campaign-details`}>
        <button className="btn-primary">View Details</button>
      </Link>
    </div>
  );
};

export default CampaignCard;
