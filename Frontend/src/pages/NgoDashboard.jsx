import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import NgoDonationCard from "../Components/NgoDonationCard";
import NgoPickupCard from "../Components/NgoPickupCard";
import { FaBoxOpen, FaTruck, FaHandHoldingHeart, FaSpinner } from "react-icons/fa";

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

      const res = await axios.post(
        `${url}/api/ngo/accept-donation/${donationId}`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedDonation = res.data.donation;

      setAvailableDonations((prev) =>
        prev.filter((d) => d._id !== donationId)
      );
      setMyPickups((prev) => [updatedDonation, ...prev]);
      setActiveTab("myPickups"); // Switch to pickups to show user they accepted it
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
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-3">
             <FaHandHoldingHeart className="text-green-600" />
             Receiver Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Connect surplus food with those who need it most.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <FaBoxOpen className="text-2xl" />
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium">Available to Pickup</p>
               <p className="text-3xl font-bold text-gray-800">{availableDonations.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-4">
             <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <FaTruck className="text-2xl" />
            </div>
             <div>
               <p className="text-sm text-gray-500 font-medium">My Active Pickups</p>
               <p className="text-3xl font-bold text-gray-800">{myPickups.length}</p>
            </div>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="mb-8 border-b border-gray-200">
            <div className="flex gap-8">
               <button 
                  onClick={() => setActiveTab('available')}
                  className={`pb-4 text-sm font-semibold transition-colors relative ${activeTab === 'available' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Available Donations
                 {activeTab === 'available' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                 )}
               </button>
               <button 
                  onClick={() => setActiveTab('myPickups')}
                  className={`pb-4 text-sm font-semibold transition-colors relative ${activeTab === 'myPickups' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 My Pickups
                  {activeTab === 'myPickups' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                 )}
               </button>
            </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-20">
             <FaSpinner className="animate-spin text-4xl text-green-600" />
          </div>
        )}

        {/* Content */}
        {!loading && (
           <>
              {activeTab === 'available' ? (
                availableDonations.length === 0 ? (
                   <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                      <FaBoxOpen className="text-4xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No active donations available at the moment.</p>
                   </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableDonations.map(donation => (
                       <NgoDonationCard 
                          key={donation._id} 
                          donation={donation} 
                          onAccept={handleAccept} 
                          isAccepting={acceptingId === donation._id} 
                        />
                    ))}
                  </div>
                )
              ) : (
                 myPickups.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                      <FaTruck className="text-4xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">You haven&apos;t accepted any donations yet.</p>
                   </div>
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {myPickups.map(donation => (
                          <NgoPickupCard 
                            key={donation._id} 
                            donation={donation} 
                            onStatusChange={handleStatusChange} 
                          />
                       ))}
                    </div>
                 )
              )}
           </>
        )}
      </div>
    </div>
  );
}
