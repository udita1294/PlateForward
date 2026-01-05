import NgoStatusBadge from "./NgoStatusBadge";
import { FaUtensils, FaWeightHanging, FaMapMarkerAlt, FaClock, FaBoxOpen } from "react-icons/fa";

export default function NgoDonationCard({ donation, onAccept, isAccepting }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Header */}
      <div className="h-48 w-full bg-gray-100 relative overflow-hidden group">
        {donation.imgUrl ? (
          <img
            src={donation.imgUrl}
            alt={donation.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
            <FaBoxOpen className="text-4xl opacity-50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <NgoStatusBadge status={donation.status} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={donation.title}>
          {donation.title}
        </h2>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5em]">
          {donation.description || "No description provided."}
        </p>

        <div className="space-y-2 mb-4">
           <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaUtensils className="text-green-500 text-xs" />
              <span className="font-medium capitalize">{donation.foodType}</span>
           </div>
           
           <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaWeightHanging className="text-blue-500 text-xs" />
              <span>{donation.quantity} units</span>
           </div>

           {donation.pickupAddress && (
             <div className="flex items-start gap-2 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-red-500 text-xs mt-1" />
                <span className="truncate">{donation.pickupAddress.city}, {donation.pickupAddress.street}</span>
             </div>
           )}

           {donation.pickupDateTime && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 pt-2 border-t border-gray-50">
                 <FaClock />
                 <span>Pickup by: {new Date(donation.pickupDateTime).toLocaleString()}</span>
              </div>
           )}
        </div>

        <div className="mt-auto">
          <button
            className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-sm
              ${ isAccepting 
                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                 : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-100' 
              }`}
            onClick={() => onAccept(donation._id)}
            disabled={isAccepting}
          >
            {isAccepting ? "Accepting..." : "Accept Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
