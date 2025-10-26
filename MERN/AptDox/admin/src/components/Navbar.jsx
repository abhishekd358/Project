import React from 'react'
import { useContext } from 'react'
import AdminContext from '../context/admin-context/AdminContext'
import {assets} from '../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom'
import DoctorContext from '../context/doctor-context/DoctorContext'

const Navbar = () => {
    // if toke admin there based on we toggel the navbar for doc and admin
    const {adminToken, setAdminToken} = useContext(AdminContext)
    const {doctorToken, setDoctorToken} = useContext(DoctorContext)

    // redirect homepage
    const navigate = useNavigate()

    // logout function
    const logout = ()=>{
      if(localStorage.getItem('adminToken')){
        setAdminToken('')
        localStorage.removeItem('adminToken')
        navigate('/')
        }
        
        if(localStorage.getItem('doctorToken')){
          setDoctorToken('')
          localStorage.removeItem('doctorToken')
          navigate('/')
        }

    }


    // for doctor logout ==================
    // logout function
    // const logoutDoctor = ()=>{                            // ================== instead of making another function we add logic in abve logout()
    //     navigate('/')
        //  doctorToken && setDoctorToken('')                  
    //     doctorToken && localStorage.removeItem('dToken')
    // }




  return (
    <div className='flex justify-between item-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-sm'>
            <img className='w-36 cursor-pointer sm:w-40' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>{adminToken ? 'Admin' : doctorToken ? 'Doctor' : 'Welcome'}</p>
        </div>

        {adminToken || doctorToken ? <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
        :
        <button className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Login</button>}
        
    </div>
  )
}

export default Navbar