import React from 'react'

export const Banner = () => {
    return (
        <div className=' bg-cl  px-4 lg:px-24 flex items-center'>
            <div className='flex flex-col lg:flex-row-reverse justify-between items-center gap-12 py-12 md:py-40'>
                {/* right side */}
                <div className='flex items-center justify-center w-[180px] h-[180px]'>

                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8'>
                    <h1 className='text-2xl lg:text-6xl md:text-5xl font-bold text-white mb-5 lg:leading-tight leading-snug'>Listen to your <span className='text-red'>favourite local music</span></h1>
                    <p>Beyond just music, it's a thriving community where artists and fans connect in a visually appealing and intuitive space, and a community-driven ethos.</p>
                </div>
            </div>
        </div>
    )
}
