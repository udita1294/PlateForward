import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

export default function DonorDashboard() {
  const { url, token } = useContext(StoreContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/donation/my-donations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        console.log(" Donations:", res.data.donations);
        setDonations(res.data.donations);
      })
      .catch((err) => console.log("ERROR:", err.response?.data || err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
        My Donations
      </h2>

      {/* If empty */}
      {donations.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No donations posted yet.
        </p>
      )}

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">{item.description}</p>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full 
                  ${
                    item.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }
                  ${
                    item.status === "active"
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }
                  ${
                    item.status === "collected"
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }
                  ${
                    item.status === "cancelled" ? "bg-red-100 text-red-700" : ""
                  }

                `}
              >
                {item.status.toUpperCase()}
              </span>

              {/* Pickup Info */}
              <div className="mt-3 text-gray-700 text-sm">
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Pickup Time:</strong>{" "}
                  {new Date(item.pickupDateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Address:</strong> {item.pickupAddress?.street},{" "}
                  {item.pickupAddress?.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
