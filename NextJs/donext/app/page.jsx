import { ToastContainer } from "react-toastify";
import Form from "@/Components/Form";
import Todo from "@/Components/Todo";
export default function Home() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-200 py-8 px-4">
      <ToastContainer/>
      <Form/>
      {/* Table Section */}
      <div className="max-w-6xl mx-auto bg-white/40 rounded-2xl shadow-lg p-8 border border-pink-100">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Your Tasks</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-pink-300 to-rose-300 text-white">
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
