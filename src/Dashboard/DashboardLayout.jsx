import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
      <div>
        <SideBar/>
      </div>
      <Outlet/>
    </div>
  )
}
