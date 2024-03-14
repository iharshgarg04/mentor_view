import React from 'react'
import './dashboard.css'
import Sidebar from '../../components/Sidebar'
import WorkArea from '../../components/WorkArea'

const DashBoard = () => {
  return (
    <div className='main-container'>
        <Sidebar/>
        <WorkArea/>
    </div>
  )
}

export default DashBoard