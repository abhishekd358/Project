import React from 'react'
import {Moon, Sun} from 'lucide-react'
import { useState , useEffect } from 'react'
import { cn } from '../lib/utils'
const ThemeToggle = () => {
    
    const [isDarkMode, setIsDarkMode] = useState(()=>{
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    });

  useEffect(() => {
      if(isDarkMode){
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark')
      }else{
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
            }

    }, [isDarkMode])

  return (
    <>
   {/* fixed max-smihidden top-5 right-5 2-50 p-2 rounded-full transition-colors duration” */}
    <button className={cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration",
      "focus:outlin-in-hidden ")} 
    onClick={()=>setIsDarkMode(!isDarkMode)}>{
    isDarkMode?  
    <Sun className='h-6 w-6 text-yellow-300'/>
    :
    <Moon className='h-6 w-6 text-blue-900'/>}</button>
    </>
  )
}

export default ThemeToggle