import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import { FaUtensils, FaFileAlt, FaList, FaSortNumericUp, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaMapPin, FaCalendarAlt, FaCloudUploadAlt, FaCheckCircle, FaArrowLeft} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LocationPicker from "../Components/Maps/LocationPicker";

export default function AddDonations() {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("foodType", form.foodType);
      formData.append("quantity", Number(form.quantity));

      const pickupAddress = {
        street: form.street,
        city: form.city,
        state: form.state,
        pin: form.pin,
      };

      formData.append("pickupAddress", JSON.stringify(pickupAddress));
      if (form.location) {
        formData.append("location", JSON.stringify(form.location));
      }
      formData.append("pickupDateTime", new Date(form.pickupDateTime).toISOString());

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        `${url}/api/donation/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // alert("Donation posted!");
      navigate('/my-donations'); 
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to post donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/my-donations" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-green-600 p-6 text-white text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <FaUtensils /> Post a Food Donation
            </h2>
            <p className="text-green-100 mt-2">Share your surplus food with those in need</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Food Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Food Details</h3>
                
                <InputField 
                  label="Title"
                  icon={<FaUtensils />}
                  placeholder="E.g., 20 Veg Meals"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 text-gray-400">
                      <FaFileAlt />
                    </div>
                    <textarea
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                      placeholder="Describe the food items..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 text-gray-400">
                        <FaList />
                      </div>
                      <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none appearance-none bg-white"
                        value={form.foodType}
                        onChange={(e) => setForm({ ...form, foodType: e.target.value })}
                      >
                        <option value="cooked">Cooked</option>
                        <option value="raw">Raw Ingredient</option>
                        <option value="packaged">Packaged Food</option>
                      </select>
                    </div>
                  </div>

                  <InputField 
                    label="Quantity"
                    icon={<FaSortNumericUp />}
                    placeholder="Units/Servings"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Pickup Info</h3>

                <InputField 
                  label="Street Address"
                  icon={<FaMapMarkerAlt />}
                  placeholder="123 Main St"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField 
                    label="City"
                    icon={<FaCity />}
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <InputField 
                    label="State"
                    icon={<FaGlobeAmericas />}
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField 
                    label="Pin Code"
                    icon={<FaMapPin />}
                    placeholder="123456"
                    value={form.pin}
                    onChange={(e) => setForm({ ...form, pin: e.target.value })}
                  />
                   <InputField 
                    label="Pickup Time"
                    icon={<FaCalendarAlt />}
                    type="datetime-local"
                    value={form.pickupDateTime}
                    onChange={(e) => setForm({ ...form, pickupDateTime: e.target.value })}
                  />
                </div>

                {/* Location Picker */}
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Pin Current Location</label>
                   <LocationPicker onLocationSelect={(loc) => setForm({...form, location: loc})} />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                    <input
                      type="file"
                      id="image-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    {preview ? (
                      <div className="relative h-32 w-full">
                        <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-medium opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          Change Image
                        </div>
                      </div>
                    ) : (
                      <div className="py-4">
                        <FaCloudUploadAlt className="text-4xl text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload image</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-green-200 transaction-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Posting...' : <><FaCheckCircle /> Post Donation</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, icon, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute top-3 left-3 text-gray-400 text-lg">
          {icon}
        </div>
        <input
          type={type}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
