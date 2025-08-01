import React from 'react'
import {CircleUserRound, Star} from 'lucide-react'
import {assets} from '../assets/assets'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import MyContext from '../context/MyContex'
const Navbar = () => {
  const {setShowLogin, user, logout, credit} = useContext(MyContext)
  return (
    <div className='py-4  flex justify-between items-center'>
        {/* image */}
        <Link to='/'><img src={assets.artifex} alt="Artifex Logo"  width={150}/></Link>



      {/* conditional rednering if user login or logout */}
      {
      user ?

      <div className='flex items-center gap-2 sm:gap-3'>
        <button className='flex items-center gap-2 bg-blue-100 px-4 py-1.5 sm:px-6 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 '>
          <img src={assets.credit_star} alt="" className='w-5' />
          <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left: {credit}</p>

        </button>


        <p className='text-gray-600 pl-4 max-sm:hidden'>Hi, {user}</p>
        <div className='relative group '>
          <img src={assets.profile_icon} alt="" className='w-10 drop-shadow'/>
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
            <ul className='list-none m-0 p-2 bg-white rounded-md text-sm'>
              <li className='py-1 px-2 cursor-pointer pr-10' onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
        
      :
      <div className='flex items-center gap-4 list-none'>
            <li><Link to='/buy'>Pricing</Link></li>
            <li><button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 rounded-full text-center text-sm hover:bg-blue-500'>Login</button></li>
        </div>
      
      }

    </div>
  )
}

export default Navbar