import React from 'react'
import logo from '../assets/fl.png'
import Footer from '../components/Footer'
function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-cl md:w-[1000px] mx-auto h-full">
      <div className='md:w-[700px] py-10'>
          <div className="flex flex-col items-center w-[300px] md:w-full">
            <p className='text-center font-bold text-3xl pb-4'>Get To Know Yonela Johannes</p>
            <p className="md:w-[450px] px-4 text-lighter text-md"> I'm on a mission to blend music and innovation. <br/>
            Explore my world, my journey, and the beats that define me, and people around me.
            </p>
          </div>
        <div className="flex flex-col items-center gap-0 bg-red mt-4">
          <div className="flex items-center">
            <img src={logo} className='w-[100px] h-[100px]' alt="logo" />
            <p className='text-center font-bold text-3xl pb-4 text-black'>Forloops Studio</p>
          </div>
          <Footer />
        </div>
      </div>
        <div className="flex flex-col gap-4 bg-black md:w-[550px] p-8">
          <p className="text-lighter text-lg">Welcome to forloops-studio, We're on a journey of continuous improvement, driven by our passion for technology and music.</p>
          <p className="text-lighter text-lg">I'm Yonela Johannes, the creator behind this music player. I'm an upcoming entrepreneur based in Cape Town, Mfuleni. My expertise lies in building web and SaaS applications for companies, and I'm currently working for Hype Digital.</p>
          <p className="text-lighter text-lg">more information...</p>
        </div>
    </div>
  )
}

export default About
