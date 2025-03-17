import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { campaignId } = useParams(); // Get campaign ID from URL
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    // Fetch campaign data from an API or local data (here we're assuming local data for the example)
    const fetchCampaignDetails = async () => {
      const campaignData = await fetch(`/api/campaigns/${campaignId}`); // Replace with your API endpoint
      const campaignJson = await campaignData.json();
      setCampaign(campaignJson);
    };
    
    fetchCampaignDetails();
  }, [campaignId]);

  if (!campaign) return <p>Loading...</p>;

  return (
    <div className="campaign-details">
      <h1>{campaign.title}</h1>
      <img src={campaign.imageUrl} alt={campaign.title} />
      <p>{campaign.description}</p>
      <div className="campaign-metrics">
        <p>Goal: ${campaign.goal}</p>
        <p>Raised: ${campaign.raised}</p>
        <p>Supporters: {campaign.supportersCount}</p>
      </div>
      {/* CTA Buttons */}
      <div className="cta-buttons">
        <button className="btn-primary">Support Campaign</button>
        <button className="btn-secondary">Share</button>
      </div>
    </div>
  );
};

export default CampaignDetails;
