import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import { FaBoxOpen, FaCheckCircle, FaClock, FaHandsHelping, FaLeaf, FaMapMarkerAlt,FaSpinner} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MyDonations() {
  const { url, token } = useContext(StoreContext);

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchMyDonations();
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

  // derived stats
  const totalDonations = donations.length;
  const activeDonations = donations.filter(d => d.status === 'active').length;
  const completedDonations = donations.filter(d => ['collected', 'accepted'].includes(d.status)).length;

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-gray-800">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaHandsHelping className="text-green-600" />
            My Impact Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Track and manage your food contributions</p>
        </div>
        <Link 
          to="/add-donation" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium"
        >
          <FaLeaf /> Donate Food
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          icon={<FaBoxOpen className="text-2xl text-blue-600" />}
          label="Total Donations"
          value={totalDonations}
          color="bg-blue-50 border-blue-100"
        />
        <StatCard 
          icon={<FaCheckCircle className="text-2xl text-green-600" />}
          label="Completed"
          value={completedDonations}
          color="bg-green-50 border-green-100"
        />
        <StatCard 
          icon={<FaClock className="text-2xl text-orange-600" />}
          label="Active Listings"
          value={activeDonations}
          color="bg-orange-50 border-orange-100"
        />
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Donations</h2>
          {loading && <FaSpinner className="animate-spin text-green-600 text-xl" />}
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {!loading && donations.length === 0 && !error ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div 
                key={donation._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="h-48 w-full bg-gray-100 relative overflow-hidden group">
                  {donation.imgUrl ? (
                    <img 
                      src={donation.imgUrl} 
                      alt={donation.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                      <FaBoxOpen className="text-5xl opacity-50" />
                    </div>
                  )}
                  
                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm bg-white/90 backdrop-blur-sm ${getStatusTextColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                        {new Date(donation.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={donation.title}>
                    {donation.title}
                  </h3>
                  
                  <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <span className="bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-medium capitalize border border-green-100">
                      {donation.foodType}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="font-medium">{donation.quantity} units</span>
                  </div>

                  <div className="mt-auto space-y-2 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                       <FaClock className="text-green-600" />
                       <span className="truncate text-xs font-medium">Pickup: {formatDate(donation.pickupDateTime)}</span>
                    </div>
                    {donation.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="truncate text-xs" title={donation.address}>
                          {donation.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`p-6 rounded-2xl border ${color} flex items-center justify-between shadow-sm`}>
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-white rounded-full shadow-sm">
        {icon}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
      <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaLeaf className="text-3xl text-green-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Donations Yet</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        You haven&apos;t listed any food donations yet. Start making a difference today!
      </p>
      <Link 
        to="/add-donation" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-medium shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 transition-all"
      >
        <FaLeaf /> Donate Now
      </Link>
    </div>
  );
}

function getStatusTextColor(status) {
    switch (status) {
      case "active": return "text-blue-600";
      case "accepted": return "text-green-600";
      case "assigned": return "text-purple-600";
      case "collected": return "text-emerald-600";
      default: return "text-red-600";
    }
}
