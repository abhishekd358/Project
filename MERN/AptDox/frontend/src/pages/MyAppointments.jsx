import React, { useContext} from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom"

const MyAppointments = () => {
  const { doctors }  = useContext(AppContext)
  const navigate = useNavigate()
  
  return (
    <div className="mx-10 md:mx-20 lg:mx-25 mt-5 mb-50">
      <p className="pb-3 mt-12 font-medium tex-gray-800 border-b">
        My Appointments
      </p>
      {/* -----doctor listing */}
      <div className='space-y-6 mt-6' >
        {doctors.slice(0, 3).map((item, index)=>(
          <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border border-blue-100 rounded-md bg-neutral-50 shadow-lg p-10 transition-all duration-500 hover:scale-105 hover:shadow-md hover:shadow-indigo-50 hover:bg-blue-50 cursor-pointer' key={index} >
            {/* image */}
            <div>
              <img src={item.image} alt="" className='w-32 bg-indigo-50'/>
            </div>

            {/*appointment deatisl  */}
            <div className='flex-1 text-sm text-gray-800'>
              <p className='text-neutral-800 font-semibold '>{item.name}</p>
              <p className='text-blue-500'>{item.speciality}</p>
              <p className='text-gray-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>25, july 2025 | 10:30AM</p>
            </div>
          
            {/* to component responsive */}
            <div></div>
            {/* btn */}
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:minw-48 py-2 px-4 border rounded hover:text-white transition-all duration-500 hover:bg-blue-500 cursor-pointer'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:minw-48 py-2 px-4 border rounded hover:text-white transition-all duration-500 hover:bg-red-500 cursor-pointer'>Cancel appointmenet</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments