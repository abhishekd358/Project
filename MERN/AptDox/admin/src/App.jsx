import React from 'react'
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import { useContext } from 'react';
import AdminContext from './context/admin-context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes, Route} from 'react-router-dom'
import AddDoctor from './pages/Admin/AddDoctor'
import AllAppointment from './pages/Admin/AllAppointment'
import Dashboard from './pages/Admin/Dashboard'
import DoctorList from './pages/Admin/DoctorList'
import DoctorContext from './context/doctor-context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
    const {adminToken} = useContext(AdminContext)
    const{doctorToken} = useContext(DoctorContext)
    
  return adminToken || doctorToken ? 
    (<div>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start bg-blue-50'>
        <Sidebar/>
        {/* here wee create routes */}
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
          <Route path='/all-appointments' element={<AllAppointment/>}></Route>
          <Route path='/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorList/>}></Route>


          {/* =========== Doctor Routes ========= */}
          <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointment/>}></Route>

        </Routes>

      </div>
      
    </div>)
    :
    (
    <>
    <Navbar/>
     <Login/>
     <ToastContainer/>

    </>)
  
}


export default App;