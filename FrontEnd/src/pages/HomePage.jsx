// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import CampaignCard from "../components/CampaignCard";
import api from "../lib/api"; // ✅ centralized API instance

export default function HomePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchCampaigns() {
      try {
        const { data } = await api.get("/api/campaigns?status=active");
        if (isMounted) {
          setCampaigns(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(
          "Failed to load campaigns",
          error.response?.data || error.message
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCampaigns();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter for active campaigns first, then take the first 3
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "active"
  );
  const featuredCampaigns = activeCampaigns.slice(0, 3);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Turn Your Ideas Into Reality
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of creators and backers who are making dreams come
            true through crowdfunding. Whether you have a brilliant idea or want
            to support innovation, you're in the right place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/browse"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Campaigns
            </Link>
            {profile?.role === "creator" && (
              <Link
                to="/create"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Start a Campaign
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to fund your dreams or support others
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create or Discover"
              description="Launch your campaign with a compelling story or browse existing projects that inspire you."
            />
            <StepCard
              number="2"
              title="Fund & Support"
              description="Back projects you believe in with secure payments and watch them come to life."
            />
            <StepCard
              number="3"
              title="Make It Happen"
              description="Celebrate success as funded projects become reality and create positive impact."
            />
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing projects that need your support
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign, index) => {
                return <CampaignCard key={campaign._id} campaign={campaign} />;
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No campaigns available yet.
              </p>
              <Link
                to="/create"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Be the first to create one!
              </Link>
            </div>
          )}

          {featuredCampaigns.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/browse"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Campaigns
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard value={campaigns.length} label="Total Campaigns" />
            <StatCard
              value={`₹${campaigns
                .reduce((sum, c) => sum + (c.currentAmount || 0), 0)
                .toLocaleString()}`}
              label="Funds Raised"
            />
            <StatCard
              value={campaigns.reduce(
                (sum, c) => sum + (c.totalBackers || 0),
                0
              )}
              label="Happy Backers"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-blue-600">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-blue-200">{label}</div>
    </div>
  );
}
