import React from 'react'
import landingvid from '../../assets/Concert.mp4'
import { Link } from 'react-router-dom'

export const Banner = () =>
{
    console.log(landingvid)
    return (
        <div className=' bg-cl  px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col lg:flex-row-reverse justify-between items-center gap-12 py-12 md:py-40'>
                {/* right side */}
                <div className='flex items-center justify-center w-[180px] h-[180px]'>

                </div>

                {/* left side */}
                <div className='md:w-full space-y-8'>
                    <h1 className='text-2xl lg:text-6xl md:text-5xl font-bold text-white mb-5 lg:leading-tight leading-snug'>Listen to your <span className='text-red'>favourite local music</span></h1>
                    <p className="pt-2 text-xl text-center text-gray-300">
                        Login or Register now and join other like minded people all around the world who want to share there music!
                    </p>
                </div>
            </div>
            <div className="max-w-5xl">
                <video autoPlay muted loop id="myVideo" controls>
                    <source src={landingvid} type="video/mp4" />
                </video>

            </div>
        </div>
    )
}
