import React, { useEffect } from "react";
import "./home.css";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Home = () => {
const [mentors, setMentors] = useState([]);
  useEffect(() => {
    const fetchMentors=async()=>{
        try{
            const response = await axios.get("http://localhost:4000/mentor/fetchMentors");
            console.log(response);
            setMentors(response.data.mentors);
        }catch(error){
            console.log("Error while fetching mentors");
            toast.error("Error while Fetching mentors");
        }
    }
    fetchMentors();
  },[]);
  return (
    <>
    <div>
        {mentors.map((mentor)=>(
            <div>
                <p>{mentor.name}</p>
            </div>
        ))}
    </div>
    </>
)};

export default Home;
