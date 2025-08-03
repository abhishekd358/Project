import React from 'react'
import { assets } from '../assets/assets'
const Navbar = () => {
  return (
    <div>
        {/* arrows  */}
        <div className='flex justify-start items-center gap-8'>
            <img className='w-5' src={assets.arrow_left} alt="" />
            <img className='w-5' src={assets.arrow_right} alt="" />
        </div>

        {/* profile and other buttons */}
        <div className=''>
            <button>Explore Premium</button>
            <button>Install App</button>
            <img className='w-10' src={assets.user_icon} alt="" />
        </div>

    </div>
  )
}

export default Navbar