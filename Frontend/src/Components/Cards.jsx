import React from 'react'
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8 }
  }),
};

const Cards = () => {
  const cardData = [
    { icon: "🍴", title: "Share Surplus Food", desc: "Restaurants, shops, and individuals list their excess food with pickup details and expiry times." },
    { icon: "🤝", title: "Connect & Claim", desc: "Beneficiaries browse available food, claim what they need, and coordinate pickup and delivery." },
    { icon: "❤️", title: "Make Impact", desc: "Volunteers with delivery, communities grow stronger, and environmental impact is reduced." }
  ];

  return (
    <div className='mt-10 flex flex-wrap items-center justify-center gap-10'>
      {cardData.map((card, i) => (
        <motion.div
          key={i}
          className="bg-[#f9bd63] rounded-lg shadow-lg p-6 max-w-sm text-center text-[#333333] hover:shadow-2xl transition"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          custom={i}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#2d2420] rounded-md p-3">
              <span className="text-2xl text-[#c99b84]">{card.icon}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-[#333333] text-sm font-medium leading-relaxed">{card.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default Cards
