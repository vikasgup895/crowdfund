import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampaignCard from "../components/CampaignCard";
import api from "../lib/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myContributions, setMyContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      try {
        // ✅ Fix: Add profile API call back
        const [profileRes, campaignsRes, contributionsRes] = await Promise.all([
          api.get("/api/auth/me"), // or "/api/auth/profile" depending on your route
          api.get("/api/campaigns/my"),
          api.get("/api/contributions/my"),
        ]);

        setProfile(profileRes.data);
        setMyCampaigns(
          Array.isArray(campaignsRes.data) ? campaignsRes.data : []
        );
        setMyContributions(
          Array.isArray(contributionsRes.data) ? contributionsRes.data : []
        );
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error.response?.data || error.message
        );
        // ✅ Handle auth errors
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isCreator = profile?.role === "creator";
  const totalRaised = myCampaigns.reduce(
    (sum, c) => sum + (c.currentAmount || 0),
    0
  );
  const totalContributed = myContributions.reduce(
    (sum, c) => sum + (c.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {/* ✅ Fix: Handle missing profile data gracefully */}
            Welcome {profile?.firstName || "User"}!
          </h1>
          <p className="text-xl text-gray-600">
            {isCreator
              ? "Manage your campaigns and track your progress"
              : "Track your contributions and discover new projects"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {isCreator ? (
            <>
              <StatCard
                label="Total Campaigns"
                value={myCampaigns.length}
                color="blue"
              />
              <StatCard
                label="Total Raised"
                value={`₹${totalRaised.toLocaleString()}`} // ✅ Fix: Use ₹ symbol
                color="green"
              />
              <StatCard
                label="Total Backers"
                value={myCampaigns.reduce(
                  (sum, c) => sum + (c.totalBackers || 0),
                  0
                )}
                color="purple"
              />
            </>
          ) : (
            <>
              <StatCard
                label="Campaigns Backed"
                value={myContributions.length}
                color="blue"
              />
              <StatCard
                label="Total Contributed"
                value={`₹${totalContributed.toLocaleString()}`} // ✅ Fix: Use ₹ symbol
                color="green"
              />
              <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
                <Link
                  to="/browse"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Discover Campaigns
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Creator view */}
        {isCreator && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
              <Link
                to="/create"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create New Campaign
              </Link>
            </div>

            {myCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCampaigns.map((c) => (
                  <CampaignCard key={c._id} campaign={c} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No campaigns yet"
                description="Create your first campaign to start raising funds for your project."
                link="/create"
                linkText="Create Your First Campaign"
              />
            )}
          </div>
        )}

        {/* Backer view */}
        {!isCreator && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">
              My Contributions
            </h2>
            {myContributions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden divide-y divide-gray-200">
                {myContributions.map((c) => (
                  <ContributionRow key={c._id} contribution={c} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No contributions yet"
                description="Start supporting amazing projects and help bring ideas to life."
                link="/browse"
                linkText="Browse Campaigns"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
      <div className={`p-3 rounded-full ${colorMap[color]}`} />
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ContributionRow({ contribution }) {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
          {contribution.campaign?.imageUrl ? (
            <img
              src={
                contribution.campaign.imageUrl.startsWith("/uploads")
                  ? `http://localhost:5000${contribution.campaign.imageUrl}`
                  : contribution.campaign.imageUrl
              }
              alt={contribution.campaign.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {contribution.campaign?.title || "Campaign"}
          </h3>
          <p className="text-sm text-gray-600">
            Contributed on{" "}
            {new Date(contribution.createdAt).toLocaleDateString()}
          </p>
          {contribution.message && (
            <p className="text-sm text-gray-600 mt-1 italic">
              "{contribution.message}"
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-green-600">
          ₹{contribution.amount} {/* ✅ Fix: Use ₹ symbol */}
        </div>
        {contribution.campaign && (
          <Link
            to={`/campaign/${contribution.campaign._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View Campaign
          </Link>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, description, link, linkText }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}
