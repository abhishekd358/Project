import React from 'react'
import { stepsData } from '../assets/assets'
const WorkSection = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32 '>
            <h1 className='text-3xl sm:4xl font-semibold'>How it Works</h1>
            <p className='text-sm text-gray-600 mt-2  mb-7'>Transform Words Into Stunning Images</p>
        {/* cards */}

       <div>
    {stepsData.map((data, index)=>(
            <div key={index} className='flex justify-center items-center gap-4 bg-neutral-50 my-6 rounded-md drop-shadow-md p-5 px-8 max-w-3xl text-sm cursor-pointer hover:scale-[1.02] transition-all duration-300 min-h-[110px]'>
                <div><img src={data.icon} alt="" width={40} className='min-w-[40px]'/></div>
                    
                <div className='flex-1'>
                    <h3 className='font-semibold text-xl'>{data.title}</h3>
                    <p className='text-gray-500'>"{data.description}"</p>
                </div>
            </div>
        ))}

       </div>
        </div>
  
  )
}

export default WorkSection