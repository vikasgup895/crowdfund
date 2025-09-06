// src/pages/BrowseCampaigns.jsx
import { useState, useEffect, useMemo } from "react";
import CampaignCard from "../components/CampaignCard";
import api from "../lib/api";

const categories = [
  "All",
  "Technology",
  "Art & Design",
  "Photography",
  "Food & Craft",
  "Environment",
  "Fashion",
  "Publishing",
  "Education",
  "Health & Fitness",
];

export default function BrowseCampaigns() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns from backend using centralized api instance
  useEffect(() => {
    let isMounted = true;

    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get("/api/campaigns");
        if (isMounted) {
          setCampaigns(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        if (isMounted) setCampaigns([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCampaigns();

    return () => {
      isMounted = false;
    };
  }, []);

  // Apply filters + search with useMemo (prevents recalculating on every render)
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesCategory =
        selectedCategory === "All" || campaign.category === selectedCategory;

      const matchesSearch =
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [campaigns, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Browse Campaigns
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing projects and help bring them to life
          </p>
        </header>

        {/* Search and Filters */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-min px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCampaigns.length} campaign
                {filteredCampaigns.length !== 1 ? "s" : ""}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filters"
                : "Be the first to create a campaign!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
