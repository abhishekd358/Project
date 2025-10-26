import React, { useState } from "react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const {userData, setUserData,backendUrl, token,loadUserProfileData } = useContext(AppContext)
  console.log(userData)
  const [isEdit, setIsEdit] = useState(false);

  const[image, setImage] = useState(false)

  const updateProfile = async (e) => {
    e.preventDefault()

    // Frontend mandantory validation
     if (!userData.name.trim() || !userData.phone || !userData.gender.trim() || !userData.dob.trim()) {
        toast.error("Please fill all required fields");
        return;
  }

  // phone number length
    if(userData.phone.length < 10 ){
      toast.error('Enter valid phone number')
      return
  }

    try {
      const formData = new FormData(); //create a form data for storing form info fields
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.put(`${backendUrl}/api/user/update-profile`, formData, {headers:{token}})
      
      if(data.success){
        toast.success(data.message)
        // and again we load info 
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)

      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  
  // it handle page reload data error
  return userData && (
    <div className="max-w-4xl mx-10 sm:mx-20 lg:mx-auto p-6 md:p-8 lg:p-10 my-8 mb-20">
      {/* Profile Header with Image */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24">
          <img 
            src={image ? URL.createObjectURL(image) : userData.image} 
            alt="Profile" 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-blue-100" 
          />
          {isEdit && (
            
            <label htmlFor="image" className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border border-black bg-indigo-500">
                {/* if kisi ne edit kar na chanha , tab image file explore se choose kiya bhai ne to hum use choose image ko urlObject mai convert kar ket set kar denge varna default image hi dikhayege */}
                <img className="w-full h-full rounded-full object-cover" src={image ? URL.createObjectURL(image): userData.image}  alt="Upload" />
            </label>
          )}
          <input type="file" name="image" id="image" onChange={(e)=>setImage(e.target.files[0])} className="hidden"/>
        </div>
        
        <div className="flex-1">
          {isEdit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              className="w-full text-2xl font-bold text-gray-900 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 "
              placeholder="Enter your name"
            />
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
              {userData.name}
            </h1>
          )}
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-4">
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <p className="text-gray-900">{userData.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone*</label>
            {isEdit ? (
              <input
                type="text"
                name="phone"
                pattern="[0-9]*"
                inputMode="numeric"
                value={userData.phone}
                onChange={(e) => {const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 10);
    setUserData({ ...userData, [e.target.name]: onlyNums });
  }}
                className="w-full text-gray-900 bg-blue-50 px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter 10 digit phone number"
              />
            ) : (
              <p className="text-gray-900">{userData.phone}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          {isEdit ? (
            <div className="space-y-2">
              <input
                type="text"
                name="line1"
                value={userData.address.line1}
                onChange={(e)=>setUserData({...userData,address: { ...userData.address, line1: e.target.value },})}
                className="w-full text-gray-900 bg-blue-50 px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Street address"
              />
              <input
                type="text"
                name="line2"
                value={userData.address.line2}
                onChange={(e)=>setUserData({...userData,address: { ...userData.address, line2: e.target.value },})}
                className="w-full text-gray-900 bg-blue-50 px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="City, State, ZIP"
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-900">{userData.address.line1}</p>
              <p className="text-gray-600 text-sm">{userData.address.line2}</p>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-4">
          Basic Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Gender*</label>
            {isEdit ? (
              <select 
                name="gender" 
                value={userData.gender}
                onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}
                className="w-full text-gray-900 bg-blue-50 px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="No Selection">No Selection</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to disclose">Prefer not to disclose</option>
              </select>
            ) : (
              <p className="text-gray-900">{userData.gender}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth*</label>
            {isEdit ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                className="w-full text-gray-900 bg-blue-50 px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            ) : (
              <p className="text-gray-900">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="px-6 py-2 border border-blue-400 text-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isEdit ? "Cancel" : "Edit Profile"}
        </button>
        
        {isEdit && (
          <button type="submit"
            onClick={updateProfile}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;