import Image from "next/image";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <AuthForm/>
        
    </div>
  );
}
