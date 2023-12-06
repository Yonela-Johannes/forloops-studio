import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-6 flex-col md:flex-row'>
      <div>
        <SideBar/>
      </div>
      <Dashboard />
    </div>
  )
}
