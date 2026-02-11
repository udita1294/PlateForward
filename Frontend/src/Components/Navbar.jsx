import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { FaLeaf, FaBars, FaTimes, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
              <FaLeaf className="text-green-600 text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">PlateForward</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">

            <Link to="/ngo-dashboard" className="text-gray-600 hover:text-green-600 font-medium transition-colors text-sm">
              Browse Food
            </Link>
            <Link to="/my-donations" className="text-gray-600 hover:text-green-600 font-medium transition-colors text-sm">
              My Donations
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-green-600 font-medium transition-colors text-sm">
              Admin Dashboard
            </Link>

            <div className="pl-4 border-l border-gray-200 ml-4 flex items-center space-x-3">
              {!token ? (
                <Link to="/login">
                  <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all font-medium text-sm shadow-md hover:shadow-lg transform active:scale-95">
                    <FaSignInAlt className="text-xs" />
                    <span>Sign In</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition-all font-medium text-sm border border-red-100"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none p-2"
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[
              { name: 'Browse Food', path: '/ngo-dashboard' },
              { name: 'My Donations', path: '/my-donations' },
              { name: 'Admin Dashboard', path: '/admin' }
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 mt-2 border-t border-gray-100">
              {!token ? (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition font-medium"
                >
                  <FaSignInAlt />
                  <span>Sign In</span>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 w-full bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 transition font-medium border border-red-100"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
