import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

export default function AddDonations() {
  const { url, token } = useContext(StoreContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    foodType: "cooked",
    quantity: "",
    pickupAddress: "",
    pickupTime: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("image", image);

    await axios.post(`${url}/donations/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Donation posted!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Post a Food Donation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Eg: Fresh Rice & Dal"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Describe the food (Fresh home-cooked, packaged, etc.)"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Food Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, foodType: e.target.value })}
          >
            <option value="cooked">Cooked</option>
            <option value="raw">Raw</option>
            <option value="packaged">Packaged</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Quantity (people served / units)
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Eg: 5 plates"
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Pickup Address</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Your location"
            onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
          />
        </div>

        {/* Pickup Time */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Pickup Time</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Eg: 5 PM"
            onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Post Donation
        </button>
      </form>
    </div>
  );
}
