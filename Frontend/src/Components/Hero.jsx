import React from "react";
import Cards from "./Cards";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";


const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-b from-green-50/50 to-white text-gray-800 font-sans flex-grow pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32"
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-green-700 uppercase bg-green-100/80 rounded-full">
            Fighting Hunger Together
          </div>

          <motion.h2
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Turn Food Waste <br />
            Into <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">Food Security</span>
          </motion.h2>

          <motion.p
            className="max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Connect surplus food with those who need it. Together we can reduce waste, 
            support local communities, and create a sustainable future.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
             <Link to="/add-donation">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                Donate Food <FaArrowRight />
              </motion.button>
            </Link>
            
            <Link to="/ngo-dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition shadow-sm flex items-center justify-center gap-2"
              >
                <FaSearch className="text-gray-400" /> Find Food
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>
      </div>

      {/* How it Works */}
      <div id="how-it-works" className="bg-white py-24 px-4 border-t border-gray-50">
        <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps, Big Impact
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-12">
              Our platform makes it easy to share or receive food in just a few clicks.
            </p>
          </motion.div>

          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Hero;
