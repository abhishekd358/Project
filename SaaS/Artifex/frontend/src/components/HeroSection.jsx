import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {Link } from 'react-router-dom'
import MyContext from '../context/MyContex'
import { toast } from 'react-toastify'

const HeroSection = () => {
  const {user} = useContext(MyContext)



  return (
    <div className='flex flex-col justify-center items-center py-12'>
        <p className='border rounded-full border-neutral-500 px-6 py-2 bg-white text-sm text-stone-500'>Best text to image Generator <img src={assets.star_icon} alt="" className='inline-flex' /></p>

        
        <div className='pt-10 pb-10 text-5xl  text-center sm:text-8xl'>
            <h1>Turn text to <br></br><span className='text-blue-600'>image</span>, in seconds.</h1>
        </div>
        
        
             <p className='text-center w-130 max-sm:w-120'>Uneleash yout creativity with AI. Turn your imagaintion into visual art in seconds - just type, and watch the magic happen </p>
        
        {user ? <Link to='/result'><button  className='bg-gray-900 px-8 py-3 rounded-full text-white text-xs text-center mt-8 mb-15 hover:cursor-pointer'>Generate Images <img className='inline w-5 ml-1.5' src={assets.star_group} alt="" /></button>
        </Link>
        :
        <button  onClick={ ()=> toast('Login First !')} className='bg-gray-900 px-8 py-3 rounded-full text-white text-xs text-center mt-8 mb-15 hover:cursor-pointer'>Generate Images <img className='inline w-5 ml-1.5' src={assets.star_group} alt="" /></button>
      }

        <div className='flex justify-center items-center gap-1.5'>
            <img src={assets.sample_img_1} alt="" className='w-16 rounded-lg'/>
            <img src={assets.sample_img_2} alt="" className='w-16 rounded-lg'/>
            <img src={assets.sample_img_1} alt="" className='w-16 rounded-lg'/>
            <img src={assets.sample_img_2} alt="" className='w-16 rounded-lg'/>
            <img src={assets.sample_img_1} alt="" className='w-16 rounded-lg'/>
            <img src={assets.sample_img_2} alt="" className='w-16 rounded-lg'/>
        </div>
            <p className='text-center text-neutral-600 text-sm mt-2'>Generated images from ArtifexAi</p>
    </div>
  )
}

export default HeroSection