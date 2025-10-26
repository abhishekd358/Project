import React from 'react'
import { useContext } from 'react'
import AdminContext from '../../context/admin-context/AdminContext'
import { useEffect } from 'react'
import AppContext from '../../context/app_context/AppContext'
import {assets} from '../../assets/assets_admin/assets.js'
const AllAppointment = () => {

  const {appointments, AllAppointments,adminToken,cancelAppointments} = useContext(AdminContext)

  const {calculateAge, dateFormating,currency} = useContext(AppContext)

  useEffect(()=>{
    if(adminToken){
      AllAppointments()
    }
  },[adminToken])



  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointmets</p>

        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
          
          
          
          
          {/* table Header */}
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>


          {/* all appointment render here */}
          {appointments.map((item, index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index+1}</p>

              {/* of user img */}
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>

              {/* dob */}
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{dateFormating(item.slotDate)}, {item.slotTime}</p>


              {/* of doc img */}
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>


              {/* of currnecy  */}
              <p>{currency}{item.amount}</p>
                {item.cancelled ?
                 <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                :
                <img onClick={()=>cancelAppointments(item._id)} className='w-10 rounded-full cursor-pointer' src={assets.cancel_icon} alt="" />
                }
             
          </div>

          ))}



        </div>
    </div>
  )
}

export default AllAppointment