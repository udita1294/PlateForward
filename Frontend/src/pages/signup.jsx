import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

export default function Signup() {
  const { url, setToken } = useContext(StoreContext);

  const [role, setRole] = useState("donor");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
      },
      role,
    };

    try {
      const response = await axios.post(`${url}/api/user/register`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("Signup successful!");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const roleCard = (value, title, subtitle) => (
    <div
      onClick={() => setRole(value)}
      className={`cursor-pointer p-5 rounded-xl border ${
        role === value
          ? "bg-[#e28c0a] border-[#f8f3ed] text-black"
          : "bg-[#f8f3ed] border-[#4a3a31] text-black"
      } transition-all`}
    >
      {/* <div className="text-3xl mb-2">🍽️</div> */}
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm opacity-70">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F9F9F6] to-[#f0fdf4] flex items-start justify-center pt-20 text-black">
      <div className="w-[750px] bg-[#cbf3cd] rounded-3xl p-10 shadow-lg border border-[#3a2f27]">
        <h1 className="text-4xl text-green-700 font-bold text-center mb-3">
          Join FoodShare
        </h1>
        <p className="text-center  mb-10">
          Create your profile to start making a difference in your community
        </p>

        <h2 className="text-lg font-semibold mb-2">Profile Setup</h2>
        <p className="text-sm opacity-70 mb-5">
          Tell us about yourself so we can connect you with the right
          opportunities
        </p>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {roleCard("donor", "Donate Food", "Share surplus food")}
          {roleCard("receiver", "Receive Food", "Access free food")}
          {roleCard("volunteer", "Volunteer", "Help with delivery")}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="name"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="email"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="phone"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold">Address Information</h2>

          {/* Street */}
          <div>
            <input
              type="text"
              name="street"
              className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
              placeholder="Street Address"
              onChange={handleChange}
            />
          </div>

          {/* City + State + Zip */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <input
                type="text"
                name="city"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="City"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="state"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="State"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="zip"
                className="w-full mt-1 p-3 rounded-lg bg-[#f8f3ed] border border-[#4a3a31]"
                placeholder="Pin Code"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" required />
            <p className="font-semibold">
              By continuing , I agree to the terms of use and privacy policy
            </p>
          </div>
          <p className="font-semibold">
            Already have an account ?{" "}
            <Link to="/login">
              <span className="text-orange-500">Login Here</span>
            </Link>
          </p>
          <button
            type="submit"
            className="cursor-pointer w-full mt-5 p-3 rounded-xl bg-[#ed6a07] text-black font-semibold hover:bg-[#a24804] transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
