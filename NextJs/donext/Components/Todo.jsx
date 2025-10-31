const Todo = async () => {
  // api call to render the todo from db 
    // fetchAlltodo
  const fetchAllTodo = async() =>{
      try {
        // api call
        const response =await fetch('http://localhost:3000/api',{cache:'no-store'})
        const data = await response.json()
        console.log(data)

      } catch (error) {
        
      }
  }

  return (
    <>

        <tr className="border-b border-pink-200 hover:bg-rose-100 transition-colors duration-200">
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    This is the end
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-md">
                  <p className="line-clamp-2">
                    This is a sample task description that shows how longer text will be handled with proper truncation and styling.
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-2 px-4 font-semibold text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <span>✅</span>
                      Completed
                    </button>
                    <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 py-2 px-4 font-semibold text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <span>🗑️</span>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
    </>
  )
}

export default Todo