import React, { useEffect, useState } from "react";
import "./allstudents.css";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
// import StudentList from "../../components/StudentList";
import AllStudentList from "../../components/AllStudentList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {refreshSidebarfun } from "../../features/refreshSlice";

const Allstudents = () => {
  const [Students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentKey);
  const refresh = useSelector((state)=>state.refreshKey);
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  useEffect(() => {
    const fetchAllStudents = async () => {
      const response = await axios.get("http://localhost:4000/student/");
      setStudents(response.data.response);
      console.log(response, "hii all");
    };
    fetchAllStudents();
    console.log(studentData,"hi stu")
  }, [refresh]);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/mentor/addStudents",
        {
          students: studentData.studentData,
          mentorId: mentor._id,
        }
      );
      console.log(response, "hi res");
      if (response.status === 200) {
        dispatch(refreshSidebarfun());
        toast.success("students added successfully");
      }
    } catch (error) {
      toast.error("select min 3 and max 4 students");
      console.log(error);
    }
  };
  return (
    <div className="allstudents-container">
      <div className="allstudents-title">
        <h1>List of All Students</h1>
      </div>
      <Box
        sx={{
          marginTop: "35px",
          display: "flex",
          justifyContent: "center",
          flex: "1",
        }}
      >
        <TextField
          type="search"
          id="search"
          label="Search"
          sx={{ width: 600 }}
        />
      </Box>
      <div className="allstudent-list">
        <AllStudentList Students={Students} />
      </div>
      <Box
        sx={{
          color: "black",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Button
          sx={{ background: "#5c5470", color: "white" }}
          onClick={handleCreate}
        >
          Add Students
        </Button>
      </Box>
    </div>
  );
};

export default Allstudents;
