import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const Navbar = () => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍴</span>
          <h1 className="text-xl font-bold">PlateForward</h1>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#browse" className="hover:text-gray-500">
            Browse Food
          </a>
          <a href="#how" className="hover:text-gray-500">
            How it Works
          </a>
          <Link to = '/my-donations'><p className="hover:text-gray-500">
            Donations
          </p></Link>

          {/* ---------- CONDITIONAL RENDERING ---------- */}

          {/* If NOT logged in → show Sign In */}
          {!token && (
            <Link to="/login">
              <button className="flex items-center space-x-1 bg-[#FF9800] text-black px-4 py-2 rounded-md hover:bg-[#f78a58] transition cursor-pointer">
                <span>Sign In</span>
              </button>
            </Link>
          )}

          {/* If logged in → show Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              <span>Logout</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
