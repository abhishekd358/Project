import { assets } from "../assets/assets_frontend/assets";


const About = () => {


  return (
    <div className="mx-10 md:mx-20 lg:mx-25 mt-5 mb-50">
      {/* heading */}
      <h1 className="uppercase text-2xl font-base text-center text-gray-600">ABOUT <span className="font-semibold text-gray-800">US</span></h1>
      {/* content of the page */}
      <div className="grid lg:items-center md:flex gap-10 pt-15">
        <img src={assets.about_image} alt="" className=" w-70 md:w-80 h-70"/>
        {/* content of about us */}
        <div>
        <p className="text-md title font-base text-gray-500 ">
          Welcome to AptDox, your dedicated partner in revolutionizing healthcare management through intelligent appointment solutions and
          seamless digital documentation. We understand the complexities of navigating today's healthcare landscape and have created an intuitive
          platform that bridges the gap between patients and providers, making quality healthcare accessible to everyone. </p>
          <p className="text-md title font-base text-gray-500 text-justify py-5">
          At AptDox, we're committed to transforming how you manage your health
          journey. Our innovative system combines cutting-edge technology with
          user-friendly design to simplify appointment scheduling, medical
          record keeping, and health monitoring - all in one secure, easy-to-use
          platform that puts your healthcare needs right at your fingertips.
          </p>
          
          <h2 className="pb-5 font-bold text-gray-700">Our Vision</h2>
          <p className="text-md title font-base text-gray-500 text-justify">At AptDox, we envision a future where healthcare management is completely seamless, accessible, and personalized—enabling individuals to effortlessly navigate their health journey with confidence and clarity, anytime and anywhere.</p>
          </div>
      </div>
      {/* why chosse use  */}
      <h2 className="mt-20 mb-10 text-lg font-base text-gray-600">WHY <span className="font-semibold text-gray-800">CHOOSE US</span></h2>
      
      
      <div className="grid md:flex border border-gray-300 md:min-w-[700px]">  
        {/* effieceny div */}
        <div className="p-15 border-b-1 md:border-r-1 border-gray-300">
          <h3 className="uppercase font-medium text-md text-gray-900">EFFICIENCY:</h3>
          <p className="text-gray-500 pt-5">Streamlined processes and smart scheduling save you valuable time and reduce waiting periods.</p>
        </div>
        {/* Convenience div */}
        <div className="p-15 border-b-1 md:border-r-1 border-gray-300">
          <h3 className="uppercase font-medium text-md text-gray-900">Convenience:</h3>
          <p className="text-gray-500 pt-5">Streamlined processes and smart scheduling save you valuable time and reduce waiting periods.</p>
        </div>
        {/* Personalization div */}
        <div className="p-15 ">
          <h3 className="uppercase font-medium text-md text-gray-900">Personalization:</h3>
          <p className="text-gray-500 pt-5">Streamlined processes and smart scheduling save you valuable time and reduce waiting periods.</p>
        </div>
        
      </div>
    </div>
  );
};

export default About;
