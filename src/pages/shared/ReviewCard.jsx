import React from 'react'
// react icons
import { FaStar } from 'react-icons/fa6'
import { Avatar } from 'flowbite-react';
import profile from "../../assets/LOGO.png"

const ReviewCard = () => {
    return (
        <div className='space-y-6'>
            {/* texts */}
            <div className='mt-7'>
                <p className='mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptatibus libero eaque illo voluptate ducimus commodi, eos, quam repellendus, officiis esse cum alias nemo blanditiis dolore quas officia molestiae accusantium!</p>
                <Avatar
                    alt="avatar of Jese"
                    img={profile}
                    rounded
                    className='w-10 mb-4'
                />
                <h5 className='text-lg font-medium'>Mark Ping</h5>
                <p className='text-sm'> CEO, ABC Company</p>
            </div>
        </div>
    )
}

export default ReviewCard
