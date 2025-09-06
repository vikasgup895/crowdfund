import { Link } from "react-router-dom";
const { VITE_API_BASE } = import.meta.env;

// Function to calculate days left from end date
function calculateDaysLeft(endDate) {
  if (!endDate) return "N/A";

  const end = new Date(endDate);
  const now = new Date();

  // Calculate difference in milliseconds
  const diffTime = end - now;

  // Convert to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Return 0 if campaign has ended, otherwise return days left
  return diffDays > 0 ? diffDays : 0;
}

export default function CampaignCard({ campaign }) {
  // Safely handle numbers
  const currentAmount = Number(campaign?.currentAmount) || 0;
  const goalAmount = Number(campaign?.goalAmount) || 1; // avoid divide by 0
  const progressPercentage =
    Number(campaign?.progressPercentage) || (currentAmount / goalAmount) * 100;

  // Calculate days left from campaign end date
  const daysLeft = calculateDaysLeft(campaign?.deadline);

  // Enhanced completion logic using database status
  const isCompleted = campaign?.status === "completed";
  const isExpired = campaign?.status === "expired";
  const isActive = campaign?.status === "active";

  return (
    <Link to={`/campaign/${campaign._id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          {campaign?.imageUrl ? (
            <img
              src={
                campaign.imageUrl.startsWith("/uploads")
                  ? `${VITE_API_BASE}${campaign.imageUrl}`
                  : campaign.imageUrl
              }
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
              <svg
                className="w-12 h-12 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isCompleted
                  ? "bg-green-600 text-white"
                  : isExpired
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {isCompleted
                ? "Completed"
                : isExpired
                ? "Expired"
                : campaign?.category || "General"}
            </span>
          </div>

          {/* Completion/Expiry overlay */}
          {(isCompleted || isExpired) && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div
                className={`text-white px-4 py-2 rounded-lg font-semibold ${
                  isCompleted ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {isCompleted ? "✓ COMPLETED" : "⏰ EXPIRED"}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign?.title || "Untitled Campaign"}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {campaign?.description || "No description available."}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>₹{currentAmount.toLocaleString()} raised</span>
              <span>
                {progressPercentage && !isNaN(progressPercentage)
                  ? Math.min(progressPercentage, 100).toFixed(0)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-600"
                    : isExpired
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
                style={{
                  width: `${Math.min(progressPercentage, 100)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Goal: ₹{goalAmount.toLocaleString()}</span>
              <span
                className={
                  isCompleted
                    ? "text-green-600 font-semibold"
                    : isExpired
                    ? "text-red-600 font-semibold"
                    : ""
                }
              >
                {isCompleted
                  ? "Completed"
                  : isExpired
                  ? "Expired"
                  : daysLeft === "N/A"
                  ? "N/A"
                  : `${daysLeft} days left`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              by {campaign?.creator?.name || "Creator"}
            </div>
            <div
              className={`font-medium ${
                isCompleted
                  ? "text-green-600"
                  : isExpired
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {isCompleted
                ? "View Results →"
                : isExpired
                ? "View Details →"
                : "View Details →"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
