// src/pages/CampaignDetails.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import api from "../lib/api";

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  const [contributionAmount, setContributionAmount] = useState("");
  const [contributionMessage, setContributionMessage] = useState("");
  const [isContributing, setIsContributing] = useState(false);

  const isOwner =
    campaign?.creator && user?.profile?._id === campaign?.creator._id; // Fetch campaign from backend using Axios instance

  useEffect(() => {
    let mounted = true;

    const fetchCampaign = async () => {
      try {
        const res = await api.get(`/api/campaigns/${id}`);
        if (mounted) setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        if (mounted) setCampaign(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCampaign();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleContribute = (e) => {
    e.preventDefault();

    if (isOwner) {
      toast.error("🚫 You cannot contribute to your own campaign!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          fontSize: "16px",
          fontWeight: "500",
        },
      });
      return;
    }
    const amount = parseFloat(contributionAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid contribution amount");
      return;
    }
    if (amount < 1) {
      toast.error("Minimum contribution is ₹1");
      return;
    }

    // Navigate to payment page with contribution details
    const params = new URLSearchParams({
      amount: amount.toString(),
      message: contributionMessage.trim() || "",
    });

    navigate(`/payment/${id}?${params.toString()}`);
  };

  // ✅ Simplified logic using database status
  const {
    progress,
    daysLeft,
    isActive,
    isCompleted,
    isExpired,
    isGoalReached,
  } = useMemo(() => {
    if (!campaign)
      return {
        progress: 0,
        daysLeft: 0,
        isActive: false,
        isCompleted: false,
        isExpired: false,
        isGoalReached: false,
      };

    const progress = campaign.goalAmount
      ? (campaign.currentAmount / campaign.goalAmount) * 100
      : 0;

    const daysLeft = Math.max(
      0,
      Math.ceil(
        (new Date(campaign.deadline).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    );

    // Use database status as primary source of truth
    const isActive = campaign.status === "active";
    const isCompleted = campaign.status === "completed";
    const isExpired = campaign.status === "expired";
    const isGoalReached = campaign.currentAmount >= campaign.goalAmount;

    return {
      progress,
      daysLeft,
      isActive,
      isCompleted,
      isExpired,
      isGoalReached,
    };
  }, [campaign]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Campaign Not Found
          </h2>
          <Link to="/browse" className="text-blue-600 hover:underline">
            Browse other campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Campaign Image */}
              <div className="aspect-video bg-gray-200 relative">
                {campaign.imageUrl ? (
                  <img
                    src={
                      campaign.imageUrl.startsWith("/uploads")
                        ? `http://localhost:5000${campaign.imageUrl}`
                        : campaign.imageUrl
                    }
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", e.target.src);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
                    <svg
                      className="w-16 h-16 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === "completed"
                        ? "bg-green-600 text-white"
                        : campaign.status === "expired"
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {campaign.status === "completed"
                      ? "Completed"
                      : campaign.status === "expired"
                      ? "Expired"
                      : campaign.category}
                  </span>
                </div>

                {/* Status overlay */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div
                      className={`px-6 py-3 rounded-lg font-bold text-lg text-white ${
                        isCompleted ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {isCompleted
                        ? isGoalReached
                          ? "✓ GOAL REACHED"
                          : "✓ COMPLETED"
                        : "⏰ EXPIRED"}
                    </div>
                  </div>
                )}
              </div>

              {/* Campaign Info */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {campaign.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <span>by {campaign.creator?.name || "Unknown"}</span>
                  <span
                    className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : campaign.status === "expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                  </span>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {campaign.description}
                  </p>
                </div>

                {/* Contributions */}
                {campaign.contributions &&
                  campaign.contributions.length > 0 && (
                    <div className="border-t pt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Recent Contributions
                      </h3>
                      <div className="space-y-4">
                        {campaign.contributions.map((contribution) => (
                          <div
                            key={contribution._id}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {contribution.backer?.name?.charAt(0) || "?"}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">
                                  {contribution.backer?.name || "Anonymous"}
                                </span>
                                <span className="text-blue-600 font-semibold">
                                  ₹ {contribution.amount}
                                </span>
                              </div>
                              {contribution.message && (
                                <p className="text-gray-600 text-sm mt-1">
                                  {contribution.message}
                                </p>
                              )}
                              <p className="text-gray-400 text-xs mt-1">
                                {new Date(
                                  contribution.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>
                    ₹ {campaign.currentAmount?.toLocaleString()} raised
                  </span>
                  <span>{Math.min(progress, 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      campaign.status === "completed"
                        ? "bg-green-600"
                        : campaign.status === "expired"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Goal: ₹ {campaign.goalAmount?.toLocaleString()}</span>
                  <span
                    className={
                      campaign.status === "completed"
                        ? "text-green-600 font-semibold"
                        : campaign.status === "expired"
                        ? "text-red-600 font-semibold"
                        : ""
                    }
                  >
                    {campaign.status === "completed"
                      ? "Completed"
                      : campaign.status === "expired"
                      ? "Expired"
                      : `${daysLeft} days left`}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.totalBackers}
                  </div>
                  <div className="text-sm text-gray-600">Backers</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${
                      campaign.status === "completed"
                        ? "text-green-600"
                        : campaign.status === "expired"
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {campaign.status !== "active" ? "✓" : daysLeft}
                  </div>
                  <div className="text-sm text-gray-600">
                    {campaign.status !== "active"
                      ? campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)
                      : "Days Left"}
                  </div>
                </div>
              </div>

              {/* Contribution Form or Status Message */}
              {isActive ? (
                <form onSubmit={handleContribute} className="space-y-4">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Contribution Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      min="1"
                      step="0.01"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      value={contributionMessage}
                      onChange={(e) => setContributionMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Leave a message for the creator..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isContributing}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isContributing ? "Processing..." : "Contribute"}
                  </button>
                </form>
              ) : (
                <div
                  className={`text-center py-8 rounded-lg border ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div
                    className={isCompleted ? "text-green-600" : "text-red-600"}
                  >
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {isCompleted ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      )}
                    </svg>
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-1 ${
                      isCompleted ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    Campaign{" "}
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                    !
                  </h3>
                  <p
                    className={`text-sm ${
                      isCompleted ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCompleted
                      ? isGoalReached
                        ? "Funding goal has been successfully reached"
                        : "Campaign has been marked as completed"
                      : "Campaign deadline has passed"}
                  </p>
                  {isCompleted && isGoalReached && (
                    <div className="mt-3 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium inline-block">
                      {(
                        (campaign.currentAmount / campaign.goalAmount) *
                        100
                      ).toFixed(0)}
                      % Funded
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
