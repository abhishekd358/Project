import React from "react";
import "./App.css";
const App = () => {
  return (
    <>
      {/* sidebar card 1 home and search */}
      <div id="widget-1" className=" bg-[#121212] max-w-md mx-2 my-2 px-7 py-4 flex flex-col gap-5 rad rounded-lg">

        <div className="flex items-center gap-4">
          <img src="../src/assets/home.png" alt=""  width="25"/>
          <h1 className="text-md font-semibold">Home</h1>
        </div>

        <div  className="flex items-center gap-4">
          <img src="../src/assets/search.png" alt="" width="25" />
          <h1 className="text-md font-semibold">Search</h1>
        </div>


      </div>


    {/* Library card */}
    <div id="widget-2" className="bg-[#121212] h-[70vh] max-w-md mx-2 my-2 px-3 py-4 flex flex-col gap-5 rounded-lg">

        <div className="flex items-center gap-4">
          <img src="../src/assets/stack.png" alt=""  width="30"/>
          <h1 className="text-md font-semibold">Your Library</h1>
         <div className="flex gap-4 justify-center ml-48">
            <img src="../src/assets/arrow.png" alt=""  width="20"/>
            <img src="../src/assets/plus.png" alt=""  width="20"/>
         </div> 

        </div>

      {/* creat playlist card */}
        <div  className="bg-[#333333] rounded-lg px-4 py-4">
            <h2 className="text-md mb-1 font-bold">Create your first playlist</h2>
            <p className="mb-4 text-sm">it's easy we'll help you</p>
            <button className="bg-gray-300 text-gray-800 text-sm font-semibold py-1.5 px-4 rounded-full">Create playlist</button>
          </div>


      {/* creat Browse PlayList */}

      <div  className="bg-[#333333] rounded-lg px-4 py-4">
            <h2 className="text-md mb-1 font-bold">Let's find some podcast to follow</h2>
            <p className="mb-4 text-sm">We'll keep you update on new episode</p>
            <button className="bg-gray-300 text-gray-800 text-sm font-semibold py-1.5 px-4 rounded-full">Browse podcasts</button>
          </div>

      </div>
















  </>

    
  );
};

export default App;
