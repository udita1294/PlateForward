import React from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#F9F9F6] to-[#f0fdf4] text-[#333333] font-sans min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center text-center px-6 py-30"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold leading-snug"
            whileHover={{ scale: 1.05 }}
          >
            Turn Food Waste <br />
            Into <span className="text-[#4CAF50]">Food Security</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-lg text-[#333333]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Connect food donors with those in need. Reduce waste, fight hunger,
            and build stronger communities through our surplus food management
            platform.
          </motion.p>

          <motion.div
            className="mt-10 flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#81C784] text-black px-6 py-3 rounded-md font-medium hover:bg-[#4ccf52] transition"
            >
              Get Started →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#FF9800] text-[#333333] px-6 py-3 rounded-md font-medium border border-[#c99b84] hover:bg-[#e68e0a] transition"
            >
              Browse Available Food
            </motion.button>
          </motion.div>
        </motion.section>
      </div>

      {/* How it Works */}
      <div className="bg-[#f0fdf4] text-[#4CAF50] font-sans">
        <div className="flex flex-col items-center justify-center text-center px-6 py-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold leading-snug"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How Food Share Works
          </motion.h2>
          <p className="text-[#201b18] font-semibold mt-6 max-w-2xl text-lg">
            Simple steps to make difference in our community
          </p>

          {/* cards */}
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Hero;
