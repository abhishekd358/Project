import { assets } from "../assets/assets_frontend/assets"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <section className="px-10 py-2 bg-blue-50/40 border-t-1 border-blue-100 !mx-0">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        {/* left container */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">AptDox seamlessly connects patients, doctors, and administrators.
          It simplifies appointments, records, and daily healthcare operations with ease.</p>

        </div>

        {/* middel container */}
        <div>
            <p className="uppercase text-xl font-medium mb-5 font-poppins ">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <Link to={'/'} className="hover:text-blue-500">Home</Link>
              <Link to={'/doctors'} className="hover:text-blue-500" >Doctors</Link>
              <Link to={'/about'} className="hover:text-blue-500">About us</Link>
              <Link to={'contact'} className="hover:text-blue-500">Contact</Link>
            </ul>
        </div>

        {/* right container */}
        <div>
          <p className="uppercase text-xl font-medium mb-5 font-poppins ">GET IN TOUCH</p>
          <ul  className="flex flex-col gap-2 text-gray-600">
            <li>+91 30846757</li>
            <li>example@proton.mail</li>
          </ul>
        </div>
      </div>

      
      {/* Copyright section */}
      <div className="border-t-1 border-t-blue-300">
        {/* <hr /> */}
        <p className="text-center py-5 text-sm text-gray-600">Developed with 💗 using MERN by <a
    href="https://github.com/abhishekd358"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition"
  >@Abhishek</a></p>
      </div>
    </section>
  )
}

export default Footer