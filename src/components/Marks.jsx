import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Rating,
  TextField,
} from "@mui/material";
import { myContext } from "../pages/dashBoard/DashBoard";
import axios from "axios";
import { toast } from "react-toastify";

const marks = [
  {
    id: "viva",
    name: "viva",
    label: "viva",
  },
  {
    id: "ideation",
    name: "ideation",
    label: "ideation",
  },
  {
    id: "execution",
    name: "execution",
    label: "execution",
  },
  {
    id: "projectManagement",
    name: "projectManagement",
    label: "project Management",
  },
  {
    id: "teamWork",
    name: "teamWork",
    label: "team Work",
  },
];


const Marks = () => {
  const {student,setStudent} = useContext(myContext);
  const [marksval, setMarksval] = useState({
    viva:0,
    execution:0,
    projectManagement:0,
    teamWork:0,
    ideation:0,
  })
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const handleChange = (e)=>{
    const { name, value } = e.target;
    const parsedValue = Math.max(0, Math.min(10, parseInt(value) || 0));
    setMarksval({ ...marksval, [name]: parsedValue });
    console.log(parsedValue)
  }
  const handleSubmit=async()=>{
    try{
      console.log(marksval)
      const response = await axios.post("http://localhost:4000/student/marks",{
        studentId:student._id,
        mentorId:mentor._id,
        viva:marksval.viva,
        ideation:marksval.ideation,
        execution:marksval.execution,
        projectManagement:marksval.projectManagement,
        teamWork:marksval.teamWork,
      })
      if(response.status===200){
        toast.success("marks are saved successfully")
        setMarksval({
          viva:0,
          execution:0,
          projectManagement:0,
          teamWork:0,
          ideation:0,
        })
      }
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="marks-container">
      <div className="marks-header">
        <div className="marks-title">{student.name} marks form</div>
        {marks.map((mark, index) => (
          <div className="marks-row">
            <FormControl sx={{width:"100%"}}>
              <InputLabel htmlFor={mark.id}>{mark.label}</InputLabel>
              <OutlinedInput
              required
                id={mark.id}
                placeholder="0-10"
                label={mark.label}
                type="number"
                name = {mark.id}
                onChange={handleChange}
                value={marksval[mark.id]} 
                inputProps={{
                  min: 0,
                  max: 10,
                  onInput: (e) => {
                    e.target.value = Math.max(0, Math.min(10, parseInt(e.target.value) || 0));
                  }
                }}
              />
            </FormControl>
          </div>
        ))}
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", padding: "10px 50px" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Marks;