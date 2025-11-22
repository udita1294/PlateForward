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
    street: "",
    city: "",
    state: "",
    pin: "",
    pickupDateTime: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      formData.append(
        "pickupDateTime",
        new Date(form.pickupDateTime).toISOString()
      );

      formData.append("image", image);

      const response = await axios.post(
        `${url}/api/donation/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Donation posted!");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to post donation");
    }
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
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Describe the food (Fresh home-cooked, packaged, etc.)"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Food Type
          </label>
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

        {/* Address Street */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Street</label>
          <input
            className="w-full border..."
            placeholder="Street"
            onChange={(e) => setForm({ ...form, street: e.target.value })}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">City</label>
          <input
            className="w-full border..."
            placeholder="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">State</label>
          <input
            className="w-full border..."
            placeholder="State"
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Pin Code
          </label>
          <input
            className="w-full border..."
            placeholder="123456"
            onChange={(e) => setForm({ ...form, pin: e.target.value })}
          />
        </div>

        {/* Pickup Date + Time */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Pickup Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full border..."
            onChange={(e) =>
              setForm({ ...form, pickupDateTime: e.target.value })
            }
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className=" text-gray-600 font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Post Donation
        </button>
      </form>
    </div>
  );
}
