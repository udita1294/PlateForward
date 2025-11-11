import { FaLeaf, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

export default function ImpactSection() {
  return (
    <div>
      <div className="bg-[#fff7ed] text-[#333333] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fighting Food Waste & Hunger
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-6">
              Every year, millions of tons of perfectly good food go to waste while
              people in our communities struggle with food insecurity.
              <span className="font-semibold text-[#d9a066]"> FoodShare </span>
              bridges this gap by creating a platform where excess food finds its
              way to those who need it most.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaLeaf className="text-green-500 text-lg" />
                <span>Reduce environmental impact from food waste</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaHeart className="text-red-500 text-lg" />
                <span>Address food insecurity in local communities</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-500 text-lg" />
                <span>Build stronger neighborhood connections</span>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="bg-[#cbf3cd] rounded-lg flex items-center justify-center h-64 shadow-lg">
            <div className="text-center">
              <span className="text-5xl">🍴</span>
              <p className="mt-4 text-[#d9a066] font-medium">Impact Visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#f0fdf4] text-[#333333] font-sans py-16 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="font-bold text-3xl text-[#4CAF50]">
          Ready to Make a Difference ?
        </h1>
        <p className="font-medium mt-6 text-lg">
          Join thousands of community members who are fighting food waste and hunger
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {["Donor", "Beneficiary", "Volunteer"].map((role, i) => (
            <button
              key={i}
              className="bg-[#FF9800] text-[#333333] px-6 py-3 rounded-md font-medium border border-[#c99b84] hover:bg-[#e68e0a] transition"
            >
              Join as {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
