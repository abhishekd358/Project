import React from "react";
import { assets, Introduction } from "../assets/assets";
const CreateImageSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32  p-6 md:px-28">
      <h1 className="text-3xl sm:4xl font-semibold mb-2">Create AI Images</h1>
      <p className="text-sm text-gray-600 mt-2  mb-7">
        Turn Your Imagination Into Visuals
      </p>

        <div className="flex flex-col justify-center mt-12 md:gap-15 md:flex-row items-center">
            <img src={assets.sample_img_1} alt="" className="w-80 xl:w-96 rounded-lg"/>
            <div>
                <h3 className="text-5xl text-gray-700 mt-12 mb-9">{Introduction.title}</h3>
                <p className="text-gray-500 text-md">{Introduction.desc1}</p>
                <br />
                <p className="text-gray-500 text-md">{Introduction.desc2}</p>
            </div>
        </div>


    </div>
  );
};

export default CreateImageSection;
