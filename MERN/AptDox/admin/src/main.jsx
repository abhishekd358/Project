import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider from './context/admin-context/AdminContextProvider.jsx'
import AppContextProvider from './context/app_context/AppContextProvider.jsx'
import DoctorContextProvider from './context/doctor-context/DoctorContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
          <App />
        </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider> 
      </BrowserRouter>
  </StrictMode>,
)
