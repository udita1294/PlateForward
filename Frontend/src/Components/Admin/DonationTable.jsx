import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DonationTable = ({ donations, fetchDonations, token }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/admin/donations/${id}`|| `https://plateforward-backend.onrender.com/api/admin/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Donation deleted successfully");
      fetchDonations();
    } catch (error) {
      toast.error("Failed to delete donation");
    }
  };

  return (
    <div className="card overflow-hidden mt-8">
      <h3 className="text-gray-800 font-bold text-lg mb-4">Recent Donations</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Donor</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                    <div className="font-medium text-gray-800">{d.title}</div>
                    <div className="text-xs text-gray-500">{d.foodType} • {d.quantity} units</div>
                </td>
                <td className="p-4 text-gray-600">
                    {d.donorId?.name || 'Unknown'}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    d.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    d.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {d.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {d.pickupAddress?.city}, {d.pickupAddress?.state}
                </td>
                <td className="p-4 text-right">
                    <button 
                        onClick={() => handleDelete(d._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded transition-colors"
                    >
                        Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationTable;
