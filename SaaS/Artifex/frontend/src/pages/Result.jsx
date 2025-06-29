import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'; // ✅ correct import
import { assets } from '../assets/assets'
import MyContext from '../context/MyContex'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const {generateImage} = useContext(MyContext)
  const navigate = useNavigate(); 

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(input){
      const result = await generateImage(input);

      if (result?.error === 'no-credit') {
        navigate('/buy');
        return; // stop execution if redirected
      }

      if(result){ // this is the image URL
        setIsImageLoaded(true);
        setImage(result);
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col justify-center min-h-[90vh] items-center'>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded'/>
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}/>
      </div>
      <p className={!loading ? 'hidden' : ''}>Loading...</p>

      {!isImageLoaded ? 
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p:0.5 mt-10 rounded-full'>
          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'/>
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer '>Generate</button>
        </div>
        :
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p  onClick={()=>setIsImageLoaded(false)} className='bg-transparent rounded-full cursor-pointer border border-zinc-900 text-black px-8 py-3'>Generate Another</p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      }
    </form>
  )
}

export default Result;
