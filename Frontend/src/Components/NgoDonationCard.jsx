import React, { useState } from 'react';
import NgoStatusBadge from "./NgoStatusBadge";
import { FaUtensils, FaWeightHanging, FaMapMarkerAlt, FaClock, FaBoxOpen, FaMap } from "react-icons/fa";
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

export default function NgoDonationCard({ donation, onAccept, isAccepting }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
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
             <div className="flex flex-col gap-1">
                 <div className="flex items-start gap-2 text-sm text-gray-700">
                    <FaMapMarkerAlt className="text-red-500 text-xs mt-1" />
                    <span className="truncate">{donation.pickupAddress.city}, {donation.pickupAddress.street}</span>
                 </div>
                 {donation.location && (
                    <button 
                        onClick={() => setShowMap(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-5 underline"
                    >
                        <FaMap /> View on Map
                    </button>
                 )}
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
    
    <Modal isOpen={showMap} onClose={() => setShowMap(false)} title="Pickup Location">
        {donation.location ? (
             <DonationMap lat={donation.location.lat} lng={donation.location.lng} popupText={donation.title} />
        ) : (
            <div className="text-center p-4">Location data not available</div>
        )}
    </Modal>
    </>
  );
}
