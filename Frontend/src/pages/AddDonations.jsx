import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import {FaUtensils,FaFileAlt,FaList,FaSortNumericUp,FaMapMarkerAlt,FaCity,FaGlobeAmericas,FaMapPin,FaCalendarAlt,FaCloudUploadAlt,FaCheckCircle,FaArrowLeft,FaWeightHanging,FaInfoCircle,FaShieldAlt,FaCamera,} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LocationPicker from "../Components/Maps/LocationPicker";

export default function AddDonations() {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    foodType: "cooked",
    quantity: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    pickupDateTime: "",
    location: null,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ML State
  const [mlResult, setMlResult] = useState(null);
  const [showMLConfirm, setShowMLConfirm] = useState(false);

  // Image Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  //Analyze with ML
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mlPayload = {
        food_type: form.foodType === "cooked" ? "Rice" : "Vegetables",
        quantity_kg: Number(form.quantity),
        cooked_time_hrs: 4,          // estimated
        storage_type: "Room",        // assumed
        temperature: 30,             // assumed
        distance_to_ngo_km: 8,        // avg distance
        demand_level: "Medium",
      };

      const mlRes = await axios.post(
        `${url}/api/ml/analyze-food`,
        mlPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMlResult(mlRes.data.ml_result);
      setShowMLConfirm(true);

      // Scroll to ML result
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "ML analysis failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Confirm & Create Donation
  const handleConfirmDonation = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("foodType", form.foodType);
      formData.append("quantity", Number(form.quantity));

      formData.append("pickupAddress",JSON.stringify({
          street: form.street,
          city: form.city,
          state: form.state,
          pin: form.pin,
        }));

      if (form.location) {
        formData.append("location", JSON.stringify(form.location));
      }

      formData.append("pickupDateTime",new Date(form.pickupDateTime).toISOString());

      // Save ML result
      if (mlResult) {
        formData.append("mlResult", JSON.stringify(mlResult));
      }

      if (image) {
        formData.append("image", image);
      }

      await axios.post(`${url}/api/donation/create`, formData, {
          headers: {Authorization: `Bearer ${token}`,"Content-Type": "multipart/form-data",},});
           navigate("/my-donations");
          } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post donation. Check all fields.");
    } finally {
      setLoading(false);
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <Link
              to="/my-donations"
              className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition-colors duration-200 group mb-2"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
              <span className="font-medium text-sm text-slate-500">Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Post a <span className="text-emerald-600 underline decoration-emerald-200 decoration-4">Food Donation</span>
            </h1>
            <p className="text-slate-500 mt-1">Share your surplus food with those in need.</p>
          </div>
          <div className="hidden sm:block">
            <div className="h-16 w-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner rotate-3">
              <FaUtensils size={28} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Card */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Food Details */}
            <div className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <FaFileAlt />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Food Details</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputField 
                    label="Donation Title" 
                    icon={<FaUtensils />}
                    value={form.title}
                    required
                    onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FaInfoCircle className="text-slate-400" /> Description
                  </label>
                  <textarea
                    className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 transition-all duration-200 min-h-[120px]"
                    value={form.description}
                    required
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FaList className="text-slate-400" /> Food Type
                  </label>
                  <select
                    className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all duration-200 appearance-none cursor-pointer"
                    value={form.foodType}
                    onChange={(e) => setForm({ ...form, foodType: e.target.value })}
                  >
                    <option value="cooked">Cooked Food</option>
                    <option value="raw">Raw Material / Groceries</option>
                    <option value="packaged">Packaged Food</option>
                  </select>
                </div>

                <div>
                  <InputField label="Quantity (kg/units)" 
                    icon={<FaWeightHanging />}
                    type="number"
                    value={form.quantity}
                    required
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                </div>
              </div>
            </div>

            {/*Pickup Logistics */}
            <div className="p-8 bg-slate-50/50 border-b border-slate-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <FaCalendarAlt />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Pickup Logistics</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputField 
                    label="Street Address" 
                    icon={<FaMapPin />}
                    value={form.street}
                    required
                    onChange={(e) => setForm({ ...form, street: e.target.value })} />
                </div>
                <InputField label="City" 
                  icon={<FaCity />}
                  value={form.city}
                  required
                  onChange={(e) => setForm({ ...form, city: e.target.value })}/>

                <InputField label="State" 
                    icon={<FaGlobeAmericas />}
                    value={form.state}
                    required
                    onChange={(e) => setForm({ ...form, state: e.target.value })}/>

                <InputField label="Pin Code" 
                  icon={<FaSortNumericUp />}
                  value={form.pin}
                  required
                  onChange={(e) => setForm({ ...form, pin: e.target.value })}/>

                <InputField label="Preferred Pickup Time" icon={<FaCalendarAlt />}
                  type="datetime-local"
                  value={form.pickupDateTime}
                  required
                  onChange={(e) => setForm({ ...form, pickupDateTime: e.target.value })}/>
              </div>
            </div>

            {/*Exact Location */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  <FaMapMarkerAlt />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Pin Precise Location</h2>
              </div>
              <p className="text-sm text-slate-500 mb-6 ml-13">Help volunteers find you faster by pinning your exact spot on the map.</p>
              
              <div className="rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner">
                <LocationPicker
                  onLocationSelect={(loc) => setForm({ ...form, location: loc })}
                />
              </div>

              {/*Image Upload */}
              <div className="mt-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                  <FaCamera className="text-slate-400" /> Food Photo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-[2rem] hover:bg-slate-50 hover:border-emerald-300 transition-all cursor-pointer group">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[2rem]" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="w-10 h-10 text-slate-300 mb-3 group-hover:text-emerald-500 group-hover:scale-110 transition-all" />
                        <p className="mb-2 text-sm text-slate-500 font-medium tracking-tight">Click or Drag Image</p>
                        <p className="text-xs text-slate-400">JPG, PNG up to 5MB</p>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                  
                  {preview && (
                    <div className="flex items-center justify-center bg-slate-50 rounded-[2rem] p-4 text-center">
                      <p className="text-sm text-slate-500 italic">"A good photo helps volunteers identify the food quickly!"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            {!showMLConfirm && (
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full sm:w-auto min-w-[300px] bg-gradient-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/60 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                        {loading ? (
                            <><div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> Analyzing...</>
                        ) : (
                            <><FaShieldAlt className="group-hover:rotate-12 transition-transform" /> Analyze & Post Donation</>
                        )}
                    </button>
                </div>
            )}
          </div>

          {/* ML Result & Confirm Card */}
          {showMLConfirm && mlResult && (
            <div className={`rounded-[2rem] p-8 shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-10 ${
              mlResult.will_waste === 1 
                ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 text-amber-900" 
                : "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-900"
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg shrink-0 ${
                  mlResult.will_waste === 1 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {mlResult.will_waste === 1 ? "⚠️" : "✨"}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold tracking-tight mb-2">Quality Analysis Report</h3>
                  <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                      mlResult.will_waste === 1 ? "bg-amber-200/50 text-amber-700" : "bg-emerald-200/50 text-emerald-700"
                    }`}>
                      {mlResult.will_waste === 1 ? "High Waste Risk" : "Safety Verified"}
                    </span>
                    <span className="text-lg font-semibold">
                       Waste Probability: <span className="text-2xl font-black">{(mlResult.waste_probability * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600 leading-relaxed max-w-2xl">
                    {mlResult.will_waste === 1 
                      ? "The AI predicts this donation might go to waste if not picked up quickly. We recommend prioritizing local NGOs." 
                      : "Great! This food is in stable condition and highly likely to reach recipients safely."}
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <button type="button" onClick={handleConfirmDonation} disabled={loading} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
                      {loading ? "Processing..." : <><FaCheckCircle /> Confirm Donation</>}
                    </button>
                    <button type="button" onClick={() => setShowMLConfirm(false)} className="text-slate-500 font-semibold hover:text-slate-800 transition-colors text-center">
                        Edit Details
                    </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
function InputField({ label, type = "text", value, onChange, icon, placeholder, required }) {
  return (
    <div className="w-full">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
      </label>
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 transition-all duration-200 group-hover:bg-slate-100"/>
      </div>
    </div>
  );
}

