'use client'
import Todo from "@/Components/Todo";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    desc: ''
  })

  // onchangeHandler
  // onSubmitHandler

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-200 py-8 px-4">
    {/* Form Section */}
      <div className="max-w-4xl mx-auto rounded-2xl p-8 mb-12 border border-pink-100 bg-white/30">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Add New Task</h2>
        
        <form action="">
          {/* Title Input */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <label htmlFor="title" className="text-pink-600 font-bold text-lg lg:w-1/4 lg:text-right">
              Task Title:
            </label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="w-full lg:w-3/4 px-4 py-3 bg-rose-50 border border-pink-200 rounded-xl text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-300 transition-all duration-300 font-medium placeholder-gray-400"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-6">
            <label htmlFor="desc" className="text-pink-600 font-bold text-lg lg:w-1/4 lg:text-right">
              Description:
            </label>
            <textarea 
              name="desc" 
              id="desc" 
              className="w-full lg:w-3/4 px-4 py-3 bg-rose-50 border border-pink-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-300 transition-all duration-300 resize-none min-h-[120px] placeholder-gray-400"
              placeholder="Enter task description..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 py-3 px-8 font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer">
              ADD TODO
            </button>
          </div>
        </form>
      </div>
    
      {/* Table Section */}
      <div className="max-w-6xl mx-auto bg-white/40 rounded-2xl shadow-lg p-8 border border-pink-100">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Your Tasks</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <th className="px-6 py-4 text-left font-bold text-lg rounded-tl-2xl">Title</th>
                <th className="px-6 py-4 text-left font-bold text-lg">Description</th>
                <th className="px-6 py-4 text-left font-bold text-lg rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {/* Example Task Row */}
              <Todo/>

            </tbody>
          </table>
        </div>

    </div>
    </div>
  );
}
