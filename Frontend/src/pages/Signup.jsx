import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaHandHoldingHeart, FaLeaf, FaBiking, FaSpinner } from "react-icons/fa";

export default function Signup() {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setLoading(true);
    setError("");

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
        // alert("Signup successful!"); // Removed alert for smoother UX
        if (role === "donor") {
            navigate("/add-donation");
        } else if (role === "receiver") {
            navigate("/ngo-dashboard");
        } else {
             navigate("/"); // default fallback
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const RoleCard = ({ value, title, icon: Icon, description }) => (
    <div
      onClick={() => setRole(value)}
      className={`cursor-pointer relative p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-3
        ${role === value
          ? "bg-green-50 border-green-500 shadow-md"
          : "bg-white border-gray-100 hover:border-green-200 hover:shadow-sm"
        }`}
    >
      <div className={`p-3 rounded-full ${role === value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
         <Icon className="text-2xl" />
      </div>
      <div>
         <h3 className={`font-bold ${role === value ? 'text-green-900' : 'text-gray-700'}`}>{title}</h3>
         <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      
      {role === value && (
        <div className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        
        {/* Left Side: Branding / Info (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/3 bg-green-600 p-10 flex-col justify-between text-white">
           <div>
              <div className="flex items-center gap-2 mb-8">
                 <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FaLeaf className="text-xl" />
                 </div>
                 <span className="text-2xl font-bold tracking-tight">PlateForward</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight mb-4">Join our community</h2>
              <p className="text-green-100 opacity-90">Start making a difference today. Connect surplus food with those who need it most.</p>
           </div>
           
           <div className="space-y-4 text-sm opacity-80">
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"/> Reduce food waste</p>
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"/> Help local communities</p>
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white"/> Track your impact</p>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8">Select your role and fill in your details.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <RoleCard value="donor" title="Donor" icon={FaHandHoldingHeart} description="I have food to share" />
                <RoleCard value="receiver" title="Receiver" icon={FaUser} description="I need food assistance" />
                <RoleCard value="admin" title="Admin" icon={FaBiking} description="Manage users and donations" />
              </div>

              {/* Personal Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                        icon={FaUser} 
                        name="name" 
                        placeholder="Full Name" 
                        value={form.name} 
                        onChange={handleChange} 
                    />
                    <InputField 
                        icon={FaPhone} 
                        name="phone" 
                        placeholder="Phone Number" 
                        value={form.phone} 
                        onChange={handleChange} 
                    />
                    <InputField 
                        icon={FaEnvelope} 
                        name="email" 
                        type="email"
                        placeholder="Email Address" 
                        value={form.email} 
                        onChange={handleChange} 
                        fullWidth
                    />
                     <InputField 
                        icon={FaLock} 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange} 
                        fullWidth
                    />
                  </div>
                </div>

                {/* Address Info */}
                <div>
                   <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Location</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField name="street" placeholder="Street Address" value={form.street} onChange={handleChange} fullWidth icon={FaMapMarkerAlt} />
                      <div className="grid grid-cols-3 gap-2 md:col-span-2">
                        <InputField name="city" placeholder="City" value={form.city} onChange={handleChange} />
                        <InputField name="state" placeholder="State" value={form.state} onChange={handleChange} />
                        <InputField name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
                      </div>
                   </div>
                </div>
              </div>

               {/* Terms and Submit */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                </label> 

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2 transform active:scale-[0.99]"
                >
                   {loading ? <><FaSpinner className="animate-spin" /> Creating Account...</> : "Create Account"}
                </button>

                <p className="mt-6 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-600 font-bold hover:underline">
                    Login Here
                  </Link>
                </p>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Inputs
const InputField = ({ type = "text", name, placeholder, value, onChange, icon: Icon, fullWidth = false }) => (
  <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon className="text-gray-400 text-sm" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-gray-50/30 focus:bg-white text-gray-700 text-sm placeholder-gray-400
          ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      />
    </div>
  </div>
);
