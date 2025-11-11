import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [role, setRole] = useState("donor");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
      },
      role,
    };

    await axios.post("http://localhost:3000/api/user/register", payload);
    alert("Signup successful!");
  };

  const roleCard = (value, title, subtitle) => (
    <div
      onClick={() => setRole(value)}
      className={`cursor-pointer p-5 rounded-xl border ${
        role === value
          ? "bg-[#d4c0a1] border-[#d4c0a1] text-black"
          : "bg-[#2b1f18] border-[#4a3a31] text-white"
      } transition-all`}
    >
      <div className="text-3xl mb-2">🍽️</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm opacity-70">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#1e1612] flex items-start justify-center pt-20 text-white">
      <div className="w-[750px] bg-[#2b1f18] rounded-3xl p-10 shadow-lg border border-[#3a2f27]">
        <h1 className="text-4xl font-bold text-center mb-3">Join FoodShare</h1>
        <p className="text-center text-[#d4c0a1] mb-10">
          Create your profile to start making a difference in your community
        </p>

        <h2 className="text-lg font-semibold mb-2">Profile Setup</h2>
        <p className="text-sm opacity-70 mb-5">
          Tell us about yourself so we can connect you with the right opportunities
        </p>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {roleCard("donor", "Donate Food", "Share surplus food")}
          {roleCard("ngo", "Receive Food", "Access free food")}
          {roleCard("volunteer", "Volunteer", "Help with delivery")}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
                placeholder="John Smith"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Phone Number (Optional)</label>
              <input
                type="text"
                name="phone"
                className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
                placeholder="(555) 123-4567"
                onChange={handleChange}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold">Address Information</h2>

          {/* Street */}
          <div>
            <label className="text-sm">Street Address</label>
            <input
              type="text"
              name="street"
              className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
              placeholder="123 Main Street"
              onChange={handleChange}
            />
          </div>

          {/* City + State + Zip */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="text-sm">City</label>
              <input
                type="text"
                name="city"
                className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
                placeholder="City"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">State</label>
              <input
                type="text"
                name="state"
                className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
                placeholder="State"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Pin Code</label>
              <input
                type="text"
                name="zip"
                className="w-full mt-1 p-3 rounded-lg bg-[#1e1612] border border-[#4a3a31]"
                placeholder="123456"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-5 p-3 rounded-xl bg-[#d4c0a1] text-black font-semibold hover:bg-[#c3af95] transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
