import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets_frontend/assets"

{assets}

const FooterBanner = () => {
  const navigate= useNavigate()
  return (
    <div  className="flex bg-gradient-to-r from-green-500 to-green-300 rounded-lg px-6 sm:px-10 lg:px-12 my-15 sm:my-20 md:my-25 lg:my-30 mx-10 md:mx-20 lg:mx-40">
      {/* px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 max-w-7xl mx-auto */}
      {/* container  */}
    
          {/* left div */}
        <div className="flex-1 py-8 sm:py-10 md:py-14 lg:py-24 lg:pl-5 ">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-poppins font-semibold text-white">
        <p>Book Appointment</p>
        <p className="mt-4">With 100+ Trusted Doctors</p>

        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer hover:text-gray-800 font-medium">Create account</button>
      </div>


          {/* right */}
          <div className="hidden w-70 sm:block md:w-1/2 lg:w-[350px]xl:w-[400px] relative">
            <img src={assets.appointment_img} alt="" className="w-full absolute bottom-0 right-0 max-w-md"/>
        </div>
            
        
    </div>
  )
}

export default FooterBanner