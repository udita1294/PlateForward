import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AdminStats from '../Components/Admin/AdminStats';
import UserTable from '../Components/Admin/UserTable';
import DonationTable from '../Components/Admin/DonationTable';

const AdminDashboard = () => {
  const { token, userRole, url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Protect Route - verify role is admin
  // Although backend protects data, frontend should redirect
  useEffect(() => {
    if (userRole && userRole !== 'admin') {
         toast.error("Access Denied: Admins Only");
         navigate('/');
    }
  }, [userRole, navigate]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/donations`, {
         headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setDonations(res.data.donations);
      }
    } catch (error) {
      console.error("Error fetching donations", error);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      Promise.all([fetchStats(), fetchUsers(), fetchDonations()])
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center text-emerald-600 font-bold">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
           <p className="text-gray-500 mt-1">Manage users, donations, and platform activity.</p>
        </div>
        <button onClick={() => { localStorage.removeItem("token"); navigate('/login')}} className="btn-secondary bg-gray-700 hover:bg-gray-800">
            Logout
        </button>
      </header>

      <AdminStats stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <UserTable users={users} fetchUsers={fetchUsers} token={token} />
         <DonationTable donations={donations} fetchDonations={fetchDonations} token={token} />
      </div>
    </div>
  );
};

export default AdminDashboard;
