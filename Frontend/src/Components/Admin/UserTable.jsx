import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserTable = ({ users, fetchUsers, token }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${id}`|| `https://plateforward-backend.onrender.com/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="card overflow-hidden">
      <h3 className="text-gray-800 font-bold text-lg mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Joined</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'volunteer' ? 'bg-blue-100 text-blue-700' :
                    user.role === 'receiver' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  {user.role !== 'admin' && (
                    <button 
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded transition-colors"
                    >
                        Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
