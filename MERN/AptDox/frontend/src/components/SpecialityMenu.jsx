import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets_frontend/assets.js'
const SpecialityMenu = () => {
  return (
    <section className='font-poppins px-10 py-20'>
        {/* TItle and Description */}
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 text-center'>Find by Speciality</h1>
        <p className='font-normal text-base text-center text-gray-600 py-3 max-w-2xl mx-auto'>Simple browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>

        {/* svg icon of speciality */}
        <div className='flex justify-center items-center flex-wrap gap-4 sm:gap-3 md:gap-5 pt-8 px-4'>
            {specialityData.map((item, index)=>(
                <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`} className='flex flex-col justify-center items-center w-24 sm:w-28 md:w-32 transition-all duration-500 hover:translate-y-[-10px] rounded-lg p-4'>
                    <img src={item.image} alt="" className='w-12 md:w-16 md:h-16 object-cover hover:shadow-lg duration-500 bg-blue-500 rounded-4xl'/>
                    <p className='text-xs sm:text-sm text-center font-medium text-gray-800 mt-2 whitespace-nowrap'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </section>
  )
}

export default SpecialityMenu