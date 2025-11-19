import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

export default function Login() {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios.post(`${url}/login`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");

        navigate("/"); // redirect after login
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F9F9F6] to-[#f0fdf4] flex items-start justify-center pt-20 text-black">
      <div className="w-[750px] bg-[#cbf3cd] rounded-3xl p-10 shadow-lg border border-[#3a2f27]">
        <h1 className="text-4xl text-green-700 font-bold text-center mb-3">
          Welcome Back
        </h1>
        <p className="text-center mb-10">
          Login to continue helping your community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="email"
              className="w-full mt-1 p-3 rounded-lg bg-[#f5eadb] border border-[#4a3a31]"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-3 rounded-lg bg-[#f5eadb] border border-[#4a3a31]"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <p className="font-semibold">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-orange-500">Create Account</span>
            </Link>
          </p>

          <button
            type="submit"
            className="cursor-pointer w-full mt-5 p-3 rounded-xl bg-[#ed6a07] text-black font-semibold hover:bg-[#a24804] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
