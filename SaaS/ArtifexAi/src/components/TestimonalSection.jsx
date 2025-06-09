import React from 'react'
import {assets, testimonialsData} from '../assets/assets'
const TestimonalSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-8 md:px-28">
      <h1 className="text-3xl sm:4xl font-semibold mb-2">Customer testimonials</h1>
      <p className="text-sm text-gray-600 mt-2  mb-12">
        What Our Users Are Saying
      </p>


    {/* card */}
     <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((data, index)=>(
            <div key={index} className='bg-neutral-50 p-12 drop-shadow-lg flex flex-col items-center justify-center border w-80 m-auto cursor-pointer border-neutral-200 hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                <div className='flex flex-col items-center'>
                    <img src={data.image} alt="" className='w-14 rounded-full' />
                    <h2 className='mt-3 text-lg text-gray-900'>{data.name}</h2>
                <h4 className='text-sm text-gray-500 mb-4'>{data.role}</h4>

                <div className='flex mb-4'>
                    {Array(data.stars).fill().map((items, index)=>(
                        <img src={assets.rating_star} alt="" key={index}/>
                    ))}
                </div>
                <p className='text-center text-sm text-gray-600'>{data.text}</p>
                </div>
                
                

            </div>
        ))}
    </div>


    </div>

   


  )
}

export default TestimonalSection