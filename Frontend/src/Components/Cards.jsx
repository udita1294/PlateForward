import React from 'react'

const Cards = () => {
  return (
    <div>
        <div className='mt-10 flex items-center justify-center gap-10 '>
    <div className="bg-[#f9bd63] rounded-lg shadow-lg p-6 max-w-sm text-center text-[#333333] ">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#2d2420] rounded-md p-3">
          <span className="text-2xl text-[#c99b84]">🍴</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">
        Share Surplus Food
      </h3>

      {/* Description */}
      <p className="text-[#333333] text-sm font-medium leading-relaxed">
        Restaurants, shops, and individuals list their excess food with pickup
        details and expiry times.
      </p>
    </div>

    <div className="bg-[#f9bd63] rounded-lg shadow-lg p-6 max-w-sm text-center text-[#333333]">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#2d2420] rounded-md p-3">
          <span className="text-2xl text-[#c99b84]">🤝</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">
        Connect & Claim
      </h3>

      {/* Description */}
      <p className="text-[#333333] text-sm font-medium leading-relaxed">
        Beneficiaries browse available food, claim what they need, and coordinate pickup and delivery. 
      </p>
    </div>

    <div className="bg-[#f9bd63] rounded-lg shadow-lg p-6 max-w-sm text-center text-[#333333]">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#2d2420] rounded-md p-3">
          <span className="text-2xl text-[#c99b84]">❤️</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">
        Make Impact
      </h3>

      {/* Description */}
      <p className="text-[#333333] text-sm font-medium leading-relaxed">
        Volunteers with delivery, communities grow stronger, and environmental impact is reduced. 
      </p>
    </div>

</div>
    </div>
  )
}

export default Cards
