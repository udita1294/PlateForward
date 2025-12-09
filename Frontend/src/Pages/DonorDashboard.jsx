import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

export default function MyDonations() {
  const { url, token } = useContext(StoreContext);

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchMyDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchMyDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${url}/api/donation/my-donations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDonations(res.data.donations || []);
    } catch (err) {
      console.error("My donations fetch error:", err);
      setError(err.response?.data?.message || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        My Donations
      </h1>

      {error && (
        <div className="mb-4 text-center text-sm text-red-600">{error}</div>
      )}

      {loading && (
        <div className="text-center text-gray-500">Loading donations...</div>
      )}

      {!loading && donations.length === 0 && !error && (
        <p className="text-center text-gray-500">
          You haven&apos;t made any donations yet.
        </p>
      )}

      {!loading && donations.length > 0 && (
        <div className="overflow-x-auto mt-20">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Pickup Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {donation.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                    {donation.foodType}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {donation.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(donation.pickupDateTime)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          donation.status === "active"
                            ? "bg-blue-50 text-blue-700"
                            : donation.status === "accepted"
                            ? "bg-green-50 text-green-700"
                            : donation.status === "assigned"
                            ? "bg-purple-50 text-purple-700"
                            : donation.status === "collected"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
