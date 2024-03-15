import React, { useEffect } from "react";
import "./home.css";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
const [mentors, setMentors] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchMentors=async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_URL}/mentor/fetchMentors`);
            // console.log(response);
            setMentors(response.data.mentors);
        }catch(error){
            console.log("Error while fetching mentors");
            toast.error("Error while Fetching mentors");
        }
    }
    fetchMentors();
  },[]);

  const handleMentor = (mentor)=>{
    localStorage.setItem("mentorData",JSON.stringify(mentor));
    navigate("/dashboard");
  }
  return (
    <div className="home-container">
    <div className="home-header">
        <div className="home-title">Select a Mentor from the list</div>
        {mentors.map((mentor,index)=>(
            <div key={index} className="mentors-list" onClick={()=>{handleMentor(mentor)}}>
                <p>{mentor.name}</p>
            </div>
        ))}
    </div>
    </div>
)};

export default Home;
