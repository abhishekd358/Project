import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets_frontend/assets.js'
const SpecialityMenu = () => {
  return (
    <section className='font-poppins px-10 py-20'>
        {/* TItle and Description */}
        <h1 className='text-xl md:text-2xl font-semibold text-gray-800 text-center'>Find by Speciality</h1>
        <p className='font-normal text-sm text-center text-gray-600 py-3'>Simple browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>

        {/* svg icon of speciality */}
        <div className='flex justify-center items-center flex-wrap gap-10 pt-10'>
            {specialityData.map((item, index)=>(
                <Link key={index} to={`/doctors/${item.speciality}`} className='flex flex-col justify-evenly items-center'>
                    <img src={item.image} alt="" className='w-20'/>
                    <p className='text-sm text-center font-medium text-gray-800 py-2'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </section>
  )
}

export default SpecialityMenu