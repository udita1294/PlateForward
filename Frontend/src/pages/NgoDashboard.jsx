import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import NgoDonationCard from "../Components/NgoDonationCard";
import NgoPickupCard from "../Components/NgoPickupCard";

export default function NgoDashboard() {
  const { url, token } = useContext(StoreContext);

  const [availableDonations, setAvailableDonations] = useState([]);
  const [myPickups, setMyPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("available"); // "available" | "myPickups"

  useEffect(() => {
    if (!token) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      // 👇 match backend: GET /active-donations and GET /pickups
      const [availableRes, pickupsRes] = await Promise.all([
        axios.get(`${url}/api/ngo/active-donations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${url}/api/ngo/pickups`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAvailableDonations(availableRes.data.donations || []);
      setMyPickups(pickupsRes.data.donations || []);
    } catch (err) {
      console.error("NGO dashboard fetch error:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (donationId) => {
    try {
      setAcceptingId(donationId);
      setError("");

      // 👇 match backend: POST /accept-donation/:id
      const res = await axios.post(
        `${url}/api/ngo/accept-donation/${donationId}`,
        {}, // body empty for now
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedDonation = res.data.donation;

      setAvailableDonations((prev) =>
        prev.filter((d) => d._id !== donationId)
      );
      setMyPickups((prev) => [updatedDonation, ...prev]);
    } catch (err) {
      console.error("Accept donation error:", err);
      setError(err.response?.data?.message || "Failed to accept donation");
    } finally {
      setAcceptingId(null);
    }
  };

  const handleStatusChange = async (donationId, newStatus) => {
    try {
      setError("");

      // 👇 match backend: PUT /update-pickup-status/:id
      const res = await axios.put(
        `${url}/api/ngo/update-pickup-status/${donationId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedDonation = res.data.donation;

      setMyPickups((prev) =>
        prev.map((d) => (d._id === donationId ? updatedDonation : d))
      );
    } catch (err) {
      console.error("Update status error:", err);
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        Receiver Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-3 mt-14">
        <button
          onClick={() => setActiveTab("available")}
          className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium border ${
            activeTab === "available"
              ? "bg-[#f8b008] text-white border-[#f8b008]"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Available Donations
        </button>
        <button
          onClick={() => setActiveTab("myPickups")}
          className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium border ${
            activeTab === "myPickups"
              ? "bg-[#f8b008] text-white border-[#f8b008]"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          My Pickups
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
      )}

      {loading && (
        <div className="text-center text-gray-500">Loading data...</div>
      )}

      {/* AVAILABLE DONATIONS */}
      {activeTab === "available" && !loading && (
        <div>
          {availableDonations.length === 0 ? (
            <p className="text-center text-gray-500">
              No active donations available right now.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {availableDonations.map((donation) => (
                <NgoDonationCard
                  key={donation._id}
                  donation={donation}
                  onAccept={handleAccept}
                  isAccepting={acceptingId === donation._id}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* MY PICKUPS */}
      {activeTab === "myPickups" && !loading && (
        <div>
          {myPickups.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven&apos;t accepted any donations yet.
            </p>
          ) : (
            <div className="space-y-4">
              {myPickups.map((donation) => (
                <NgoPickupCard
                  key={donation._id}
                  donation={donation}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
