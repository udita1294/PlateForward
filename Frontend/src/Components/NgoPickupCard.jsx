import React, { useState } from 'react';
import NgoStatusBadge from "./NgoStatusBadge";
import { FaUtensils, FaWeightHanging, FaMapMarkerAlt, FaCheck, FaTruck, FaTimes, FaMap, FaBoxOpen } from "react-icons/fa";
import DonationMap from "./Maps/DonationMap";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
         <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
         </div>
         <div className="p-4">
            {children}
         </div>
      </div>
    </div>
  );
};

export default function NgoPickupCard({ donation, onStatusChange }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
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
             <div className="flex justify-between items-start">
               <span>Pickup:</span>
               <div className="text-right max-w-[150px]">
                 <div className="font-medium text-gray-800 truncate">
                     {donation.pickupAddress?.city || 'N/A'}
                 </div>
                  {donation.location && (
                    <button 
                        onClick={() => setShowMap(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 w-full underline mt-0.5"
                    >
                        <FaMap /> Map
                    </button>
                 )}
               </div>
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
           {donation.status !== 'collected' && donation.status !== 'delivered' && (
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

    <Modal isOpen={showMap} onClose={() => setShowMap(false)} title="Pickup Location & Directions">
        {donation.location ? (
             <DonationMap lat={donation.location.lat} lng={donation.location.lng} popupText={donation.title} />
        ) : (
             <div className="text-center p-4">Location data not available</div>
        )}
    </Modal>
    </>
  );
}

function ActionButton({ label, icon, onClick, color, active, disabled }) {
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
