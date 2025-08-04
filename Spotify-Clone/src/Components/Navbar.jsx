import React from 'react'
import { assets } from '../assets/assets'
const Navbar = () => {
  return (
    <>
    <div className='flex justify-between items-center py-3 mb-5 px-5 sticky top-0 bg-blue-300/30 backdrop-blur-md z-50'>
        {/* arrows  */}
        <div className='flex justify-start items-center gap-8'>
            <img className='w-4 cursor-pointer' src={assets.arrow_left} alt="" />
            <img className='w-4 cursor-pointer' src={assets.arrow_right} alt="" />
        </div>

        {/* profile and other buttons */}
        <div className='flex justify-end items-center gap-4'>
            <button className='bg-gray-100 py-1.5 px-4 rounded-full text-gray-800 text-sm cursor-pointer'>Explore Premium</button>
            <button className='bg-black py-1.5 px-4 rounded-full text-gray-200 text-sm cursor-pointer'>Install App</button>
            <img className='w-8 cursor-pointer' src={assets.user_icon} alt="" />
        </div>

    </div>

    <div className='flex items-center gap-2 mt-5 px-5 '>
            <button className='bg-gray-100 py-1.5 px-4 rounded-full text-gray-800 text-sm cursor-pointer'>All</button>
        <button className='bg-black py-1.5 px-4 rounded-full text-gray-200 text-sm cursor-pointer'>Music</button>
        <button className='bg-black py-1.5 px-4 rounded-full text-gray-200 text-sm cursor-pointer'>Podcast</button>
        </div>

    </>
  )
}

export default Navbar