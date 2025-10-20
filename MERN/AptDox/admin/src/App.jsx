import React from 'react'
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import { useContext } from 'react';
import AdminContext from './context/admin-context/AdminContext';

const App = () => {
    const {adminToken} = useContext(AdminContext)
    
  return adminToken ? 
    (<div>
      <ToastContainer/>
      
    </div>)
    :
    (
    <>
     <Login/>
     <ToastContainer/>

    </>)
  
}


export default App;