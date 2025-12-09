import NgoStatusBadge from "./NgoStatusBadge";

export default function NgoPickupCard({
  donation,
  onStatusChange,
}) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {donation.title}
        </h2>
        <NgoStatusBadge status={donation.status} />
      </div>

      <p className="text-sm text-gray-600">
        {donation.description || "No description"}
      </p>

      <p className="text-sm text-gray-700">
        <span className="font-semibold">Food Type:</span> {donation.foodType}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Quantity:</span> {donation.quantity}
      </p>

      {donation.pickupAddress && (
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Pickup:</span>{" "}
          {donation.pickupAddress.street},{" "}
          {donation.pickupAddress.city},{" "}
          {donation.pickupAddress.pin}
        </p>
      )}

      {donation.pickupDateTime && (
        <p className="text-xs text-gray-500">
          Pickup Time:{" "}
          {new Date(donation.pickupDateTime).toLocaleString()}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          className="px-3 py-1 text-xs rounded-full border border-blue-500 text-blue-600"
          onClick={() => onStatusChange(donation._id, "accepted")}
        >
          Mark as Accepted
        </button>
        <button
          className="px-3 py-1 text-xs rounded-full border border-indigo-500 text-indigo-600"
          onClick={() => onStatusChange(donation._id, "assigned")}
        >
          Mark as Assigned
        </button>
        <button
          className="px-3 py-1 text-xs rounded-full border border-green-500 text-green-600"
          onClick={() => onStatusChange(donation._id, "collected")}
        >
          Mark as Collected
        </button>
        <button
          className="px-3 py-1 text-xs rounded-full border border-red-500 text-red-600"
          onClick={() => onStatusChange(donation._id, "cancelled")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
