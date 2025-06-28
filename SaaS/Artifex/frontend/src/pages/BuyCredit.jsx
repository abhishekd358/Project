import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import MyContext from '../context/MyContex'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const BuyCredit = () => {
  const {user, backendUrl, loadCreditsData, token, setShowLogin} = useContext(MyContext)

  const navigate = useNavigate();

  const initPay = async (order) => {

    const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: order.amount,
    currency: order.currency,
    name: 'Credits Payment',
    description:'Credits Payment',
    order_id: order.id,
    handler: async (response) => {
      console.log(response)
    }
};
 const rzp = new window.Razorpay(options)
 rzp.open()
}

  // function run when we click on payement button
  const paymentRazorpay = async (planId) => {
    try {
      if(!user){
        setShowLogin(true)
      }
      // else we create a payment
     const {data} =  await axios.post(backendUrl + '/api/user/pay-razor', {planId}, {headers: {token}})

     if(data.success){
      initPay(data.order)

     }
      
    } catch (error) {
      toast.error(error.message)
      
    }
    
  }






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
            <button onClick={()=>paymentRazorpay(data.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchased' : 'Get Started'}</button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default BuyCredit