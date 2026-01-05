import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import socket from "../socket";
import { toast } from "react-toastify";

export default function VolunteerDashboard() {
  const { url, token } = useContext(StoreContext);

  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ===============================
     FETCH ASSIGNED PICKUPS
  ================================ */
  useEffect(() => {
    if (!token) return;
    fetchPickups();
  }, [token]);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      setError("");

      // 👇 You may need this endpoint (explained below)
      const res = await axios.get(`${url}/api/ngo/volunteer-pickups`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPickups(res.data.donations || []);
    } catch (err) {
      console.error("Volunteer pickups fetch error:", err);
      setError(err.response?.data?.message || "Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     🔥 SOCKET LISTENERS
  ================================ */
  useEffect(() => {
    if (!token) return;

    socket.on("volunteerAssigned", (donation) => {
      setPickups((prev) => [donation, ...prev]);
      toast.info("🚚 New pickup assigned to you");
    });

    socket.on("donationStatusUpdated", (updatedDonation) => {
      setPickups((prev) =>
        prev.map((d) =>
          d._id === updatedDonation._id ? updatedDonation : d
        )
      );
    });

    return () => {
      socket.off("volunteerAssigned");
      socket.off("donationStatusUpdated");
    };
  }, [token]);

  /* ===============================
     UPDATE STATUS
  ================================ */
  const updateStatus = async (donationId, status) => {
    try {
      await axios.put(
        `${url}/api/donation/${donationId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Status updated to "${status}"`);
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Volunteer Dashboard
      </h1>

      {error && (
        <div className="mb-4 text-center text-red-600 text-sm">{error}</div>
      )}

      {loading && (
        <div className="text-center text-gray-500">Loading pickups...</div>
      )}

      {!loading && pickups.length === 0 && !error && (
        <p className="text-center text-gray-500">
          No pickups assigned to you yet.
        </p>
      )}

      {!loading && pickups.length > 0 && (
        <div className="space-y-4">
          {pickups.map((donation) => (
            <div
              key={donation._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {donation.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Quantity: {donation.quantity}
              </p>

              <p className="text-sm text-gray-600">
                Pickup Time:{" "}
                {new Date(donation.pickupDateTime).toLocaleString()}
              </p>

              <p className="text-sm mt-2">
                Status:{" "}
                <span className="font-medium capitalize">
                  {donation.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                {donation.status === "assigned" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(donation._id, "collected")
                      }
                      className="px-4 py-2 rounded bg-emerald-600 text-white text-sm"
                    >
                      Mark Collected
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(donation._id, "cancelled")
                      }
                      className="px-4 py-2 rounded bg-red-600 text-white text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
