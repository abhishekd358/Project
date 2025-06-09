import React from 'react'
import { assets } from '../assets/assets'
const BottomSection = () => {
  return (
    
         <div className='flex flex-col justify-center items-center py-12'>
            
            <h1 className="text-3xl md:3xl lg:text-4xl font-semibold mb-2">See the magic. Try now</h1>

            <button className='bg-gray-900 px-10 py-3 rounded-full text-white text-xs text-center mt-8 mb-15'>Generate Images <img className='inline w-5 ml-2' src={assets.star_group} alt="" /></button>
         </div>
  )
}

export default BottomSection