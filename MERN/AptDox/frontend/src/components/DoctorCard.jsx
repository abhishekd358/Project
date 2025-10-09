import { doctors } from "../assets/assets_frontend/assets"

const DoctorCard = () => {
  return (
    <section className='font-poppins py-20 px-50 bg-neutral-50'>
        {/* TItle and Description */}
        <h1 className='text-xl md:text-2xl font-semibold text-gray-800 text-center'>Top Doctors to Book</h1>
        <p className='font-normal text-sm text-center text-gray-600 py-3'>Simple browse through our entensive list of trusted doctors.</p>


        {/* div for holding all cards */}
        <div className="flex justify-center items-center gap-4 flex-wrap pt-10">

            {/* cards */}
        {doctors.map((doctorCard)=>(
            <div className="bg-[#eaefff] rounded-xl border-1 border-blue-100 my-2" key={doctorCard._id}>
            
            <img src={doctorCard.image} alt="" className="w-60"/>

            <div className="bg-[#ffffff] rounded-b-xl px-4 py-3">
            <p className="text-green-400 text-sm font-medium">Availble</p>
            <h2 className="font-semibold text-lg text-gray-700">{doctorCard.name}</h2>
            <p className="font-normal text-sm text-gray-500">{doctorCard.speciality}</p>
            </div>
        </div>

))}
</div>
        

    </section>
  )
}

export default DoctorCard