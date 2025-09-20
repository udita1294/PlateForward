import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍴</span>
          <h1 className="text-xl font-bold">PlateForward</h1>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#browse" className="hover:text-gray-500">
            Browse Food
          </a>
          <a href="#how" className="hover:text-gray-500">
            How it Works
          </a>
          <a href="#impact" className="hover:text-gray-500">
            Impact
          </a>
          <button className="flex items-center space-x-1 bg-[#FF9800] text-black px-4 py-2 rounded-md hover:bg-[#b9866e] transition">
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
