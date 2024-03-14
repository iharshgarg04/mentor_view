import React, { createContext, useState } from 'react'
import './dashboard.css'
import Sidebar from '../../components/Sidebar'
import WorkArea from '../../components/WorkArea'
import { Outlet } from 'react-router'
export const myContext = createContext();
const DashBoard = () => {
  const [student, setStudent] = useState();
  return (
    <myContext.Provider value={{student:student,setStudent:setStudent}}>
      <div className='main-container' >
          <Sidebar/>
          <Outlet/>
      </div>
    </myContext.Provider>
  )
}

export default DashBoard