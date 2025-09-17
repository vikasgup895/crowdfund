import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../lib/api";

export default function PaymentPage() {
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const amount = searchParams.get("amount");
  const message = searchParams.get("message");

  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, completed, expired
  const [campaign, setCampaign] = useState(null);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setPaymentStatus("expired");
      toast.error("Payment session expired");
      setTimeout(() => navigate(`/campaign/${campaignId}`), 3000);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, campaignId, navigate]);

  // Fetch campaign details
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await api.get(`/api/campaigns/${campaignId}`);
        setCampaign(res.data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        navigate(`/campaign/${campaignId}`);
      }
    };
    fetchCampaign();
  }, [campaignId, navigate]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle payment processing
  const handlePayment = async (paymentMethod) => {
    setPaymentStatus("processing");

    try {
      // Simulate payment processing (replace with actual payment gateway)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process the contribution
      const res = await api.post("/api/contributions", {
        campaignId,
        amount: parseFloat(amount),
        message: message || undefined,
        paymentMethod,
        paymentSessionId: Date.now().toString(), // In real app, use actual payment session ID
      });

      if (res.data.success) {
        setPaymentStatus("completed");
        toast.success("Thank you for your contribution!");

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate(`/campaign/${campaignId}?contribution=success`);
        }, 3000);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      setPaymentStatus("pending");
      toast.error("Payment failed. Please try again.");
    }
  };

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (paymentStatus === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Payment Session Expired
          </h2>
          <p className="text-gray-600 mb-4">
            Your payment session has timed out.
          </p>
          <button
            onClick={() => navigate(`/campaign/${campaignId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return to Campaign
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your contribution of ₹{amount}
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back to the campaign...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Timer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-red-800 font-medium">
              Payment session expires in:
            </span>
            <span className="text-2xl font-bold text-red-600">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Complete Your Payment
          </h1>

          <div className="border-b pb-4 mb-6">
            <h3 className="font-medium text-gray-900">
              Campaign: {campaign.title}
            </h3>
            <p className="text-gray-600 mt-1">by {campaign.creator?.name}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Contribution Amount:</span>
              <span className="font-semibold">₹{amount}</span>
            </div>
            {message && (
              <div className="flex justify-between">
                <span className="text-gray-600">Message:</span>
                <span className="text-sm text-gray-800 max-w-xs text-right">
                  "{message}"
                </span>
              </div>
            )}
            <div className="flex justify-between border-t pt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-green-600">
                ₹{amount}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">
              Choose Payment Method
            </h3>

            <button
              onClick={() => handlePayment("credit_card")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paymentStatus === "processing" ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Pay with Credit Card"
              )}
            </button>

            <button
              onClick={() => handlePayment("paypal")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay with PayPal
            </button>

            <button
              onClick={() => handlePayment("bank_transfer")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bank Transfer
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/campaign/${campaignId}`)}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Cancel and return to campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
