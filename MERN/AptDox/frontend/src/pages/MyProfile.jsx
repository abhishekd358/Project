import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  return (
    <div>
      {/* images */}
      <img src={assets.profile_pic} alt="" />
      <img src={assets.upload_area} alt="" />
    
    {/* user name */}
    <h1 >User Name</h1>
    <hr />
    <h2>contact Information</h2>
    <p>Email: </p>
    <p>Phone:</p>
    <p>Address:</p>

    <h2>Basic Information</h2>
    <p>Gender:</p>
    <p>Birthday:</p>

    <button>Edit</button>
    <button>Save information</button>
    
    </div>
  )
}

export default MyProfile