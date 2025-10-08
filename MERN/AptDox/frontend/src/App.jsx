import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navabar from './components/Navabar'
import Footer from './components/Footer'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'

const App = () => {
  return (
    <>

    <Navabar/>
     {/* pages Routing */}
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/doctor' element={<Doctor/>}></Route>

        <Route path='/my-appointments' element={<MyAppointments/>}></Route>
        <Route path='/my-profile' element={<MyProfile/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
        
     </Routes>
    <Footer/>
    </>
  )
}

export default App