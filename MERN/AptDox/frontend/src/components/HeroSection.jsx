import { assets } from "../assets/assets_frontend/assets";

const HeroSection = () => {
  return (
    
    <div className="bg-gradient-to-r from-purple-700 to-blue-600 rounded-2xl mx-4 md:mx-8 lg:mx-16 xl:mx-30 min-h-[100px] md:min-h-[440px] grid grid-cols-1 lg:grid-cols-2 items-center py-10 lg:py-0">
        {/* ------------------------------div holding our left box ---------------------------*/}
      <div className="order-2 relative lg:order-1 px-6 md:py-10 md:px-10 lg:pl-16 text-center lg:text-left space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins text-white font-semibold leading-tight ">Book Appointment With Trusted Doctors</h1>

        {/* div for the group profile and the para */}
          <div className="flex flex-col sm:flex-row my-6 md:my-8 justify-center lg:justify-start items-center gap-4 text-white ">
            <img src={assets.group_profiles} alt=""  className="w-24 md:w-28"/>

          <p className="max-w-xs sm:max-w-sm text-sm md:text-base opacity-90">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
          </div>

          {/* btn */}
          <div className="relative inline-block">
            <button className="bg-white text-purple-700 font-medium rounded-full px-10 md:px-10 py-3 md:py-3 cursor-pointer hover:bg-gray-100 transition-colors">Book appointment</button>
            <img src={assets.arrow_icon} alt="" className="absolute right-1/12 top-[25px]  transform -translate-y-1/2 w-4 h-4 cursor-pointer"/>
          </div>
          
          {/* div holding our right box */}
      </div>

        <div className="order-2 relative top-10 md:top-10 lg:top-0 lg:order-1 flex justify-center lg:justify-end px-6 lg:px-10">
            <img src={assets.header_img} alt="" className="w-4/5 sm:w-3/5 lg:w-full max-w-md lg:max-w-xl"/>
        </div>

    </div>


  );
};

export default HeroSection;
