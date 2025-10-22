import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import {AppContext} from "../context/AppContext"


const DoctorCard = () => {
    const navigate = useNavigate()
    const { doctors} = useContext(AppContext)
  return (
    <section id='speciality' className='font-poppins py-20 px-6 md:px-16 lg:px-25'>
        {/* Title and Description */}
        <div className="max-w-6xl mx-auto">
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 text-center'>Top Doctors to Book</h1>
            <p className='font-normal text-base text-center text-gray-600 py-3 max-w-2xl mx-auto'>Simply browse through our extensive list of trusted doctors.</p>

            {/* Cards Container */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-6 md:gap-8 lg:gap-10 pt-1 md:pt-12 justify-items-center">

                {/* Cards */}
                {doctors.slice(0, 10).map((doctorCard)=>(
                    <div className="bg-[#eaefff] rounded-xl border border-blue-100 hover:shadow-lg transition duration-300 hover:scale-105 w-full flex flex-col cursor-pointer" key={doctorCard._id} onClick={()=>{navigate(`/appointment/${doctorCard._id}`); scrollTo(0, 0)}}>
                    
                        {/* Image Container */}
                        <div className="flex-1 flex items-center justify-center">
                            <img src={doctorCard.image} alt={`Dr. ${doctorCard.name}`} className="w-full object-cover rounded-lg"/>
                        </div>

                        {/* Card Content */}
                        <div className="bg-white rounded-b-xl px-4 py-4 flex flex-col">
                            <p className="text-green-500 text-sm font-medium mb-1">Available</p>
                            <h2 className="font-semibold text-sm md:text-md text-gray-800 truncate">{doctorCard.name}</h2>
                            <p className="font-normal text-sm text-gray-600 truncate">{doctorCard.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center pt-10">
              <button className="bg-blue-100 py-3 px-10 rounded-full font-medium text-gray-700 cursor-pointer hover:bg-blue-300 transition duration-400" onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}>See all</button>
            </div>
        </div>
    </section>
  )
}

export default DoctorCard