import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import AddDonations from "./pages/AddDonations.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import NgoDashboard from "./pages/NgoDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./Context/StoreContext.jsx";

const App = () => {

  const { socket, userRole } = useContext(StoreContext);

  useEffect(() => {
    if (!socket) return;

    if (userRole === 'receiver' || userRole === 'ngo') { 
        const handleNewDonation = (newDonation) => {
            console.log("Global Listener: New Donation Received", newDonation);
            toast.success("New Donation Available! 🍛", {
                position: "top-right",
                autoClose: 5000,
            });
        };
        socket.on('new_donation', handleNewDonation);
        
        return () => {
            socket.off('new_donation', handleNewDonation);
        };
    }

    //  For Donors
    if (userRole === 'donor') {
        const handleDonationAccepted = (data) => {
            console.log("Global Listener: Donation Accepted", data);
            toast.info(data.message, {
                icon: "🤝"
            });
        };

        const handlePickupStatus = (data) => {
            console.log("Global Listener: Pickup Status Updated", data);
             const icons = {
                picked: "🚚",
                delivered: "✅",
                cancelled: "❌"
            };
            toast.success(data.message, {
                icon: icons[data.status] || "📢"
            });
        };

        socket.on('donation_accepted', handleDonationAccepted);
        socket.on('pickup_status_updated', handlePickupStatus);

        return () => {
            socket.off('donation_accepted', handleDonationAccepted);
            socket.off('pickup_status_updated', handlePickupStatus);
        }
    }

  }, [socket, userRole]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
     <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-donation" element={<AddDonations />} />
      <Route path="/my-donations" element={<DonorDashboard />} />
      <Route path="/ngo-dashboard" element={<NgoDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />


     </Routes>
    </div>
  );
};

export default App;