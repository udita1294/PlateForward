// src/components/ProfileForm.jsx
import { useState } from "react";

const ProfileForm = () => {
  const [role, setRole] = useState("donor");

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Join FoodShare</h2>
      <p className="mb-6 text-[#555555]">Create your profile to start making a difference.</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {["donor", "beneficiary", "volunteer"].map((option) => (
          <button
            key={option}
            onClick={() => setRole(option)}
            className={`p-4 border rounded-lg ${
              role === option ? "bg-[#4CAF50] text-white" : "bg-[#F9F7F1] text-[#3E2723]"
            }`}
          >
            {option === "donor" && "Donate Food"}
            {option === "beneficiary" && "Receive Food"}
            {option === "volunteer" && "Volunteer"}
          </button>
        ))}
      </div>

      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Phone Number (Optional)" className="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Street Address" className="w-full p-3 border rounded-lg" />
        <div className="grid grid-cols-3 gap-3">
          <input type="text" placeholder="City" className="p-3 border rounded-lg" />
          <input type="text" placeholder="State" className="p-3 border rounded-lg" />
          <input type="text" placeholder="Zip Code" className="p-3 border rounded-lg" />
        </div>
        <button className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg hover:bg-[#43A047] w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
