import NgoStatusBadge from "./NgoStatusBadge";

export default function NgoDonationCard({
  donation,
  onAccept,
  isAccepting,
}) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {donation.title}
        </h2>
        <NgoStatusBadge status={donation.status} />
      </div>

      {donation.imgUrl && (
        <img
          src={donation.imgUrl}
          alt={donation.title}
          className="w-full h-40 object-cover rounded-lg mt-1"
        />
      )}

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

      <button
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg disabled:opacity-60"
        onClick={() => onAccept(donation._id)}
        disabled={isAccepting}
      >
        {isAccepting ? "Accepting..." : "Accept Donation"}
      </button>
    </div>
  );
}
