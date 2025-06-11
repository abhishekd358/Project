import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-between items-center gap-4 py-3 mt-20'>

        {/* div for left
        <div className='flex justify-around items-center gap-10'> */}
            <img src={assets.logo} alt="" width={150} className='pb-2'/>
            <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:text-xs'>All right reserved. Copyright @ArtifexAi</p>
        {/* </div> */}

        {/* right div */}
        <div className='flex gap-2.5 hover:cursor-pointer' >
            <img src={assets.facebook_icon} alt="" width={35}/>
            <img src={assets.twitter_icon} alt="" width={35} />
            <img src={assets.instagram_icon} width={35} alt="" />
        </div>
    </div>
  )
}

export default Footer