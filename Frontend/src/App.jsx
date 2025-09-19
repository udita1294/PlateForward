import React from "react";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";

const App = () => {
  return (
    <div>
      <div className=" bg-[#F9F9F6] text-[#333333] font-sans">
        
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-30">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Turn Food Waste <br />
            Into <span className="text-[#4CAF50]">Food Security</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-[#333333]">
            Connect food donors with those in need. Reduce waste, fight hunger,
            and build stronger communities through our surplus food management
            platform.
          </p>

          <div className="mt-10 flex space-x-4">
            <button className="bg-[#81C784] text-black px-6 py-3 rounded-md font-medium hover:bg-[#4ccf52] transition">
              Get Started →
            </button>
            <button className="bg-[#FF9800] text-[#333333] px-6 py-3 rounded-md font-medium border border-[#c99b84] hover:bg-[#e68e0a] transition">
              Browse Available Food
            </button>
          </div>
        </section>
      </div>

      <div className=" bg-[#f9f9d7] text-[#4CAF50] font-sans">
        <div className="flex flex-col items-center justify-center text-center px-6 py-10">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            How Food Share Works
          </h2>
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

export default App;
