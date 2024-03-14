import { Icon, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
    const [mystudents, setMystudents] = useState([]);
    const mentor = JSON.parse(localStorage.getItem("mentorData"));
    useEffect(()=>{
        const fetchStudents = async()=>{
            try{
                const response = await axios.get(`http://localhost:4000/student/myStudents`,{
                    headers:{
                        mentor:mentor._id
                    }
                })
                if(response.status===200){
                    console.log(response);
                    setMystudents(response.data.student);
                    console.log(mystudents,"hii students")
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchStudents();
    },[])
  return (
    <div className='sidebar-container'>
        <div className='sidebar-header'>
            <h2>{mentor.name}</h2>
            <div>
                <IconButton>
                    <p>Add</p>
                </IconButton>
                <IconButton>
                    <p>View</p>
                </IconButton>
            </div>
        </div>
        <div className='sidebar-list'>
            {mystudents.map((student,index)=>(
                <div key={index} className='student-sidebar-list'>{student.name}</div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar