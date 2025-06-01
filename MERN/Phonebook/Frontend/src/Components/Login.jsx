import React from 'react'

const Login = () => {
  return (
    <>
    <div className='auth-main'> 
    <div className="auth-container">
    <h2>Login to Your Account</h2>
    <form className="auth-form">
      <input type="email" placeholder="Email Address" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="register.html">Register here</a></p>
    </form>
  </div>
  </div>
  </>
  )
}

export default Login