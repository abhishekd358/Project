import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <nav className="navbar">
    <div className="logo">📱 Phonebook</div>
    <div className="nav-links">
        <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to='/login'>Login</Link>
      <Link to='/phonebook'>Phonebook</Link>
    </div>
  </nav>
    </>
  )
}

export default Navbar