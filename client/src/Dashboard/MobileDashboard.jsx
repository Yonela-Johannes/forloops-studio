import React from 'react'

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import {FaBlog } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const MobileDashboard = () => {
  const { _id, isAdmin, picture, given_name, email, family_name } = useSelector((state) => state.auth)
  return (
    <div className='px-2 bg-black text-white'>
        <Navbar
      fluid
      rounded
      className="bg-cl"
    >

      <div className="flex w-full justify-between rounded-l-full bg-cl">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={picture} rounded/>}
          className="bg-black"
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {given_name} {family_name}
            </span>
            <span className="block truncate text-sm font-medium">
              {email}
            </span>
          </Dropdown.Header>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"

        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/admin/dashboard">
        Dashboard
        </Navbar.Link>
        <Navbar.Link href="/admin/dashboard/upload-song">
          Upload Song
        </Navbar.Link>
        <Navbar.Link href="/manage">
          Songs
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}

export default MobileDashboard
