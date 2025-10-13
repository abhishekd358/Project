import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="mx-10 md:mx-20 lg:mx-25 mt-5 mb-50 ">
      {/* heading */}
      <h1 className="uppercase text-2xl font-base text-center text-gray-600">
        CONTACT <span className="font-semibold text-gray-800">US</span>
      </h1>
      <div className="grid justify-center lg:items-center md:flex gap-10 pt-15">
        {/* ---------------left side image */}
        <img src={assets.contact_image} alt="" className=" w-full sm:w-xl md:w-xs md:h-1/2 lg:w-md xl:w-md" />

        {/* -----------------content of contact us right side */}
        <div>
          <h2 className=" uppercase pb-5 text-xl font-bold text-gray-600">
            OUR OFFICE
          </h2>
          <p className="text-md title font-base text-gray-500 ">
            AptDox Healthcare Solutions <br />
            4th Floor, Techwave Plaza, <br />
            Linking Road, Bandra West, <br />
            Mumbai, Maharashtra 400050 <br />
          </p>

          <p className="text-md title font-base text-gray-500 text-justify py-5 cursor-pointer">
            <a href="tel:">Phone: +91-22-2654-7890</a>
            <br />
            <a href="mailto:">Email: support@aptdox.in</a>
          </p>

          <h2 className="uppercase pb-4 text-xl font-bold text-gray-600">
            CAREER AT APTDOX
          </h2>
          <p className="text-md title font-base text-gray-500 text-justify">
            🚀 Explore Rewarding Careers at AptDox - Join Our Team! </p>
          
            <button className="mt-5 rounded border-1 border-gray-400 px-5 py-3 cursor-pointer hover:bg-black hover:text-white transion-bg duration-500">Explore Jobs</button>
         
        </div>
      </div>
    </div>
  );
};

export default Contact;
