import { Button, Icon, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import StudentList from './StudentList';
import { useSelector } from 'react-redux';
import { refreshSidebar } from '../features/refreshSlice';

const Sidebar = () => {
    const [mystudents, setMystudents] = useState([]);
    const mentor = JSON.parse(localStorage.getItem("mentorData"));
    const navigate = useNavigate();
    const refresh = useSelector((state)=>state.refreshKey);
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
    },[refresh])
  return (
    <div className='sidebar-container'>
        <div className='sidebar-header'>
            <h2>{mentor.name}</h2>
            <div>
                <Button sx={{color:"black",fontSize:"16px",fontWeight:"600"}} 
                    onClick={()=>{
                        navigate('Allstudents');
                    }}
                >Add</Button>
                <Button sx={{color:"black",fontSize:"16px",fontWeight:"600"}}>view</Button>
            </div>
        </div>
        {mystudents.length===0 ? <p className='no-student-text'>No students added yet click on Add button to start grading students</p> :
        <StudentList mystudents={mystudents}/>}
    </div>
  )
}

export default Sidebar