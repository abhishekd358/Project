import React from "react";
import { assets, Introduction } from "../assets/assets";
const CreateImageSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32 ">
      <h1 className="text-3xl sm:4xl font-semibold">Create AI Images</h1>
      <p className="text-sm text-gray-600 mt-2  mb-7">
        Turn Your Imagination Into Visuals
      </p>

        <div className="flex justify-center  gap-15 my-12">
            <img src={assets.sample_img_1} alt="" className="w-100"/>
            <div>
                <h3 className="text-5xl text-gray-700 my-12">{Introduction.title}</h3>
                <p className="text-gray-500 text-md">{Introduction.desc1}</p>
                <br />
                <p className="text-gray-500 text-md">{Introduction.desc2}</p>
            </div>
        </div>


    </div>
  );
};

export default CreateImageSection;
