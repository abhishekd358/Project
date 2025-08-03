import React from 'react'
import {assets} from '../assets/assets'
const Sidebar = () => {

  return (
    <div>
    {/* sidebar card 1 home and search */}
      <div id="widget-1" className=" bg-[#121212] mx-2 my-2 px-7 py-4 flex flex-col gap-5 rad rounded-lg cursor-pointer">

        <div className="flex items-center gap-3">
          <img src={assets.home_icon} alt=""  width="20"/>
          <h1 className="text-md font-semibold">Home</h1>
        </div>

        <div  className="flex items-center gap-3">
          <img src={assets.search_icon} alt="" width="20" />
          <h1 className="text-md font-semibold">Search</h1>
        </div>


      </div>


    {/* Library card */}
    <div id="widget-2" className="bg-[#121212] h-[80%] mx-2 my-2 px-3 py-4 flex flex-col gap-4 rounded-lg">
        
        
        <div className="flex items-center gap-3">
          <img src={assets.stack_icon} alt=""  width="32"/>
          <h1 className="text-md font-semibold">Your Library</h1>
         <div className="flex gap-3 justify-center ml-48">
            <img src={assets.arrow_icon} alt=""  width="20"/>
            <img src={assets.plus_icon} alt=""  width="20"/>
         </div> 

      </div>

      {/* creat playlist card */}
        <div  className="bg-[#333333] rounded-lg px-4 py-4">
            <h2 className="text-md mb-1 font-bold">Create your first playlist</h2>
            <p className="mb-4 text-sm">it's easy we'll help you</p>
            <button className="bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 rounded-full">Create playlist</button>
          </div>


      {/* creat Browse PlayList */}

      <div  className="bg-[#333333] rounded-lg px-4 py-4">
            <h2 className="text-md mb-1 font-bold">Let's find some podcast to follow</h2>
            <p className="mb-4 text-sm">We'll keep you update on new episode</p>
            <button className="bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 rounded-full">Browse podcasts</button>
          </div>

      </div>

    
    </div>
  )
}

export default Sidebar