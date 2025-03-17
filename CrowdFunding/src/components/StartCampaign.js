
import React, { useState } from "react";
import axios from "axios";
import "./StartCampaign.css";

const StartCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    duration: "",
    category: "",
    imageUrl: "", // Added image URL field
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      };

      const response = await axios.post("http://localhost:5000/api/create-campaign", formData,config);
     
      if (response.status === 201) {
        setMessage("Campaign created successfully!");
        setFormData({ title: "", description: "", goal: "", duration: "", category: "", imageUrl: "" });
      }
    } catch (error) {
      setMessage("Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-campaign">
      <h1>Start a Campaign</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="campaign-form">
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Campaign Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="number"
          name="goal"
          placeholder="Funding Goal ($)"
          value={formData.goal}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
        </select>
        <input
          type="text"
          name="imageUrl"
          placeholder="Enter Image URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default StartCampaign;