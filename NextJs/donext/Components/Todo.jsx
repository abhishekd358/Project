'use client'

import axios from "axios"
import { useEffect,useState } from "react"
import { toast } from "react-toastify"



const Todo =  () => {
  const [allTodo, setAllTodo] = useState([])
  console.log(allTodo);
  

  // ----------------------------fetch all todo 
  const fetchAllTodo = async () => {
    try {
      const {data} = await axios.get('http://localhost:3000/api')
      if(data.success){
        setAllTodo(data.todo)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    const interval = setInterval(()=>{
      fetchAllTodo()
    },500)
    // clean interval when anomoutn
    return () => clearInterval(interval)
  }, [])


  // ----------------------------------- complete the todo
const completeTask = async (id) => {
    try {
      const {data} = await axios.put('http://localhost:3000/api',{id})
      if(data.success){
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }


    // ----------------------------------- remove the todo
const removeTask = async (id) => {
    try {
      const {data} = await axios.delete('http://localhost:3000/api',{data:{id}})
      if(data.success){
        await fetchAllTodo()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }



  return (
    <>
    {allTodo.length === 0 ?
    <tr>
          <td colSpan="3" className="text-center py-6 text-gray-500">
            No tasks found.
          </td>
        </tr>

  :

   (allTodo.map((task, index)=>(
        <tr key={index} className="border-b border-pink-200 hover:bg-rose-100 transition-colors duration-200">
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    {task.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-md">
                  <p className="line-clamp-2">
                    {task.desc}
                  </p>
                </td>
                <td className="px-6 py-4">
                    {task.isCompleted ? <p>Completed ✅</p>
                    
                    
                    :
                    
                    <div className="flex flex-col sm:flex-row gap-2">

                    <button onClick={()=>completeTask(task._id)} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-2 px-4 font-semibold text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <span>✅</span>
                      Completed
                    </button>
                    <button onClick={()=>removeTask(task._id)} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 py-2 px-4 font-semibold text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <span>🗑️</span>
                      Remove
                    </button>
                  </div>}
                  
                </td>
              </tr>
    )))
  }
   
        
    </>
  )
}

export default Todo