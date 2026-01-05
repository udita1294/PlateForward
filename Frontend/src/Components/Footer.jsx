import React from 'react';
import { FaLeaf, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-white mb-4">
            <FaLeaf className="text-green-500 text-xl" />
            <span className="text-xl font-bold tracking-tight">PlateForward</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Connecting surplus food with those who need it most. Join us in the fight against food waste and hunger.
          </p>
          <div className="flex gap-4">
             <SocialIcon icon={FaTwitter} />
             <SocialIcon icon={FaFacebook} />
             <SocialIcon icon={FaInstagram} />
             <SocialIcon icon={FaLinkedin} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
           <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
           <ul className="space-y-2 text-sm">
             <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
             <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
             <li><Link to="/how-it-works" className="hover:text-green-400 transition-colors">How it Works</Link></li>
             <li><Link to="/impact" className="hover:text-green-400 transition-colors">Our Impact</Link></li>
           </ul>
        </div>

        {/* Action Links */}
        <div>
           <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get Involved</h3>
           <ul className="space-y-2 text-sm">
             <li><Link to="/add-donation" className="hover:text-green-400 transition-colors">Donate Food</Link></li>
             <li><Link to="/ngo-dashboard" className="hover:text-green-400 transition-colors">Receiver Dashboard</Link></li>
             <li><Link to="/register" className="hover:text-green-400 transition-colors">Volunteer</Link></li>
             <li><Link to="/partner" className="hover:text-green-400 transition-colors">Partner with Us</Link></li>
           </ul>
        </div>

         {/* Newsletter / Contact */}
         <div>
           <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
           <p className="text-xs text-gray-500 mb-4">Subscribe to our newsletter for updates on our impact.</p>
           <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                 Subscribe
              </button>
           </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
         <p>© {new Date().getFullYear()} PlateForward. All rights reserved.</p>
         <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
         </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white transition-all duration-300">
    <Icon className="text-sm" />
  </a>
);

export default Footer;
