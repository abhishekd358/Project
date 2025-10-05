import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets.js'
const Navabar = () => {
  return (
    <div className='flex justify-around items-center'>
        <div>
            <Link to='/'><img src={assets.logo} alt="aptdox logo" width={200} /></Link>
        </div>
        <div className='flex items-center gap-10 list-none text-xl '>
            <li> <Link to="/">Home</Link></li>
           <li> <Link to="/about">About</Link></li>
           <li> <Link to="/contact">Contact</Link></li>
           <li> <Link to="/doctor">Doctor</Link></li>
        </div>
    </div>
  )
}

export default Navabar