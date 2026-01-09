import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminStats = ({ stats }) => {
  if (!stats) return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;

  const barData = [
    { name: 'Total Users', value: stats.totalUsers },
    { name: 'Total Donations', value: stats.totalDonations },
  ];

  const pieData = [
    { name: 'Pending', value: stats.pendingDonations },
    { name: 'Completed', value: stats.completedDonations },
  ];

  const COLORS = ['#FBBF24', '#10B981'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Stat Cards */}
      <div className="card border-l-4 border-emerald-500">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Total Users</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
      </div>
      <div className="card border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Total Donations</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalDonations}</p>
      </div>
      
      {/* Charts */}
      <div className="card col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px] flex flex-col">
        <h3 className="text-gray-700 font-semibold mb-4">Activity Overview</h3>
        <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" barSize={50} radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="card col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px] flex flex-col">
        <h3 className="text-gray-700 font-semibold mb-4">Donation Status</h3>
         <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 text-sm mt-2">
            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-400 rounded-full"></span> Pending</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Completed</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
