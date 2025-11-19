import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";

const App = () => {

  

  return (
    <div>
      
     <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />

     </Routes>
    </div>
  );
};

export default App;
