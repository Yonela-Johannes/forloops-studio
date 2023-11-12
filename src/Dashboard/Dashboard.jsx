import React from 'react'
import Area from './components/charts/Area'
import Line from './components/charts/Line'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <Area />
      <Line />
  </div>
  )
}

export default Dashboard
