import React from 'react'
import './dashboard.css'
import Sidebar from '../../components/Sidebar'
import WorkArea from '../../components/WorkArea'
import { Outlet } from 'react-router'

const DashBoard = () => {
  return (
    <div className='main-container'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default DashBoard