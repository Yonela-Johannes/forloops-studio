import React from 'react'
import BannerCard from '../shared/BannerCard'

export const Banner = () => {
    return (
        <div className=' bg-cl  px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-40'>
                {/* right side */}
                <div className='md:w-1/2 h-full'>
                    <BannerCard />
                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8'>
                    <h1 className='lg:text-6xl text-5xl font-bold text-white mb-5 lg:leading-tight leading-snug'>Listen to your <span className='text-red'>favourite local music</span></h1>
                    <p>Beyond just a music website, it's a thriving community where artists and fans connect in a visually appealing and intuitive space, and a community-driven ethos.</p>
                </div>
            </div>
        </div>
    )
}
