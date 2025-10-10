import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets_frontend/assets.js'
const SpecialityMenu = () => {
  return (
    <section className='font-poppins px-10 py-20'>
        {/* TItle and Description */}
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 text-center'>Find by Speciality</h1>
        <p className='font-normal text-base text-center text-gray-600 py-3 max-w-2xl mx-auto'>Simple browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>

        {/* svg icon of speciality */}
        <div className='flex justify-center items-center flex-wrap gap-6 sm:gap-8 md:gap-10 pt-8 px-4 '>
            {specialityData.map((item, index)=>(
                <Link key={index} to={`/doctors/${item.speciality}`} className='flex flex-col justify-center items-center w-24 sm:w-28 md:w-32 transition-transform hover:scale-105 rounded-lg p-4'>
                    <img src={item.image} alt="" lassName='w-12 md:w-16 md:h-16 object-contain  hover:shadow-lg'/>
                    <p className='text-xs sm:text-sm text-center font-medium text-gray-800 mt-2'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </section>
  )
}

export default SpecialityMenu