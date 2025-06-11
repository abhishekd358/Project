import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import MyContext from '../context/MyContex'
const BuyCredit = () => {
  const {user} = useContext(MyContext)

  return (
    <div className='min-h-[80vh] pt-14 mb-10 flex flex-col justify-center items-center'>
      <p className='border rounded-full border-neutral-500 px-6 mb-8 py-2 bg-white text-stone-500 max-w-40'>OUR PLANS</p>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

      <div className='flex flex-wrap justify-center items-center gap-6 text-left'>
        {plans.map((data, index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg text-gray-600 border-zinc-200 w-80 h-90 px-8 py-12 hover:scale-105 transition-all duration-500'>
            <img src={assets.logo_icon} alt="" width={40}/>
            <h2 className='mt-3 mb-1 font-semibold'>{data.id}</h2>
            <p className='text-sm'>{data.desc}</p>
            <p className='mt-6 '> <span className='text-3xl font-medium'>${data.price}</span> / {data.credits} credits</p>
            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchased' : 'Get Started'}</button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default BuyCredit