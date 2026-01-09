import NgoStatusBadge from "./NgoStatusBadge";
import { FaUtensils, FaWeightHanging, FaMapMarkerAlt, FaClock, FaBoxOpen, FaCheck, FaTruck, FaTimes, FaUserCheck } from "react-icons/fa";

export default function NgoPickupCard({ donation, onStatusChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Header */}
      <div className="h-40 w-full bg-gray-100 relative overflow-hidden group">
        {donation.imgUrl ? (
          <img
            src={donation.imgUrl}
            alt={donation.title}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
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
        
        <div className="space-y-1 mb-4 text-sm text-gray-600">
            <div className="flex justify-between">
               <span>Type:</span>
               <span className="font-medium text-gray-800 capitalize">{donation.foodType}</span>
            </div>
            <div className="flex justify-between">
               <span>Quantity:</span>
               <span className="font-medium text-gray-800">{donation.quantity}</span>
            </div>
             <div className="flex justify-between">
               <span>Pickup:</span>
               <span className="font-medium text-gray-800 text-right truncate max-w-[150px]">
                 {donation.pickupAddress?.city || 'N/A'}
               </span>
            </div>
        </div>
        
        {/* Status Actions */}
        <div className="mt-auto pt-4 border-t border-gray-50">
           <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Update Status</p>
           <div className="grid grid-cols-2 gap-2">
             <ActionButton 
                label="Picked" 
                icon={<FaTruck />} 
                onClick={() => onStatusChange(donation._id, "picked")}
                color="blue"
                active={donation.status === 'picked'}
                disabled={donation.status === 'picked' || donation.status === 'delivered'}
             />
             <ActionButton 
                label="Delivered" 
                icon={<FaCheck />} 
                onClick={() => onStatusChange(donation._id, "delivered")}
                color="green"
                active={donation.status === 'delivered'}
                disabled={donation.status !== 'picked'} 
             />
           </div>
           {donation.status !== 'collected' && (
              <button 
                onClick={() => onStatusChange(donation._id, "cancelled")}
                className="w-full mt-2 text-xs text-red-500 hover:text-red-700 py-1 font-medium flex items-center justify-center gap-1"
              >
                  <FaTimes /> Cancel Pickup
              </button>
           )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, icon, onClick, color, active }) {
   const colors = {
     blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
     green: "bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
   }
   
   return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
           disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : colors[color]
        } ${active ? 'ring-2 ring-offset-1' : ''}`}
      >
        {icon} {label}
      </button>
   )
}
