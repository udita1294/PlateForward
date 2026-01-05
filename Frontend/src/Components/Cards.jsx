import React from "react";
import { FaUtensils, FaHandsHelping, FaHeart } from "react-icons/fa";

const Cards = () => {
  const cardData = [
    {
      icon: FaUtensils,
      title: "Share Surplus Food",
      desc: "Restaurants, shops, and individuals list their excess food with pickup details and expiry times.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: FaHandsHelping,
      title: "Connect & Claim",
      desc: "Beneficiaries browse available food, claim what they need, and coordinate pickup and delivery.",
       color: "bg-blue-50 text-blue-600",
    },
    {
      icon: FaHeart,
      title: "Make Impact",
      desc: "Volunteers with delivery, communities grow stronger, and environmental impact is reduced.",
       color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
      {cardData.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-8 text-center shadow-lg shadow-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-50 flex flex-col items-center"
        >
          <div className={`p-4 rounded-full mb-6 ${card.color}`}>
            <card.icon className="text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
