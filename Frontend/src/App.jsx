import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AddDonations from "./pages/AddDonations.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import NgoDashboard from "./pages/NgoDashboard.jsx";


const App = () => {

  

  return (
    <div>
      
     <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-donation" element={<AddDonations />} />
      <Route path="/my-donations" element={<DonorDashboard />} />
      <Route path="/ngo-dashboard" element={<NgoDashboard />} />


     </Routes>
    </div>
  );
};

export default App;