import React, { useEffect } from 'react'
import { useContext } from 'react'
import DoctorContext from '../../context/doctor-context/DoctorContext'
import AppContext from '../../context/app_context/AppContext'
import {assets} from '../../assets/assets_admin/assets.js'

const DoctorAppointment = () => {
    const {appointmentList, getDocAppointments, doctorToken} = useContext(DoctorContext)

    // console.log(appointmentList);
    

   const {calculateAge,dateFormating, currency} = useContext(AppContext)

   useEffect(() => {
     if(doctorToken){
      getDocAppointments()
     }
   }, [doctorToken])
   


  return (
    <div className='w-full max-w-6xl m-5 font-medium'>

      {/* Title */}
      <p className=''>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>

        {/* table headers */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
        </div>
        {/* showing all list of appointmenst  */}

        {
          appointmentList.map((item, index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
              <p className='max-sm:hidden'>{index+1}</p>

                {/* user img */}
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              {/* payment status */}
              <div>
                <p className='text-xs inline border-blue-500 px-2 rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
                
              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p >{dateFormating(item.slotDate)},{item.slotTime}</p>
              <p>{currency}{item.amount}</p>

              <div>
                <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              
            </div>

          ))
        }



      </div>
        
    </div>
  )
}

export default DoctorAppointment