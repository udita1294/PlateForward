import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup.jsx";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import AddDonations from "./Pages/AddDonations";
import DonorDashboard from "./Pages/DonorDashboard";
import NgoDashboard from "./Pages/NgoDashboard";

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
