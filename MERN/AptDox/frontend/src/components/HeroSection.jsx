import { assets } from "../assets/assets_frontend/assets";

const HeroSection = () => {
  return (
    
    <div className="bg-gradient-to-r from-purple-700 to-blue-600 rounded-xl mx-30 min-h-[548px] grid grid-cols-2 items-center">
        {/* ------------------------------div holding our left box ---------------------------*/}
      <div className="ml-20">
        <h1 className="text-5xl font-poppins text-white font-semibold leading-15">Book Appointment With Trusted Doctors</h1>

        {/* div for the group profile and the para */}
          <div className="flex my-5 justify-center items-center gap-5 text-white">
            <img src={assets.group_profiles} alt=""  className="w-30"/>
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
          </div>
          {/* btn */}
          <div className="relative">
            <button className="bg-white rounded-full px-10 py-3 cursor-pointer">Book appointment</button>
            <img src={assets.arrow_icon} alt="" className="absolute top-5 left-45 cursor-pointer"/>
          </div>
          
          {/* div holding our right box */}
      </div>

        <div className="relative top-10 max-w-xl">
            <img src={assets.header_img} alt="" />
        </div>

    </div>


  );
};

export default HeroSection;
