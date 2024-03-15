import { Button, Icon, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentList from "./StudentList";
import { useSelector } from "react-redux";
import { refreshSidebar } from "../features/refreshSlice";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Sidebar = () => {
  const [mystudents, setMystudents] = useState([]);
  const [markstudent,setMarkstudent] = useState([]);
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.refreshKey);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/student/myStudents`,
          {
            headers: {
              mentor: mentor._id,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setMystudents(response.data.student);
          setMarkstudent(response.data.studentMarks);
          console.log(response, "hii students");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, [refresh]);

  
  const generatePDF = async (studentData) => {
    const docDefinition = {
      content: [
        { text: "Student report", style: "header" },
        { text: "Name: " + studentData.studentId.name },
        { text: "Viva: " + (studentData.mark ? studentData.mark.viva : 0)},
        { text: "Execution: " + (studentData.mark ? studentData.mark.execution : 0)},
        { text: "ideation: " + (studentData.mark ? studentData.mark.ideation : 0)},
        { text: "Project Management: " + (studentData.mark ? studentData.mark.projectManagement : 0)},
        { text: "Team Work: " + (studentData.mark ? studentData.mark.teamWork : 0)},
        { text: "Total marks: " + studentData.studentId.totalMarks},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(studentData.studentId.name + "_report.pdf");
  };

  const handleSubmit = async()=>{
    try{
        const response = await axios.post("http://localhost:4000/mentor/submit",{
            mentorId:mentor._id
        });
        if(response.status===200){
            toast.success("marks locked successfully");
            markstudent.forEach((student) => {
              // console.log(student.mark,"Hii brother");
              generatePDF(student);
            });
            console.log(response);
        }
    }catch(error){
        toast.error(error.response.data.message)
      console.log(error);
    }
    }
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>{mentor.name}</h2>
        <div>
          <Button
            sx={{ color: "black", fontSize: "16px", fontWeight: "600" }}
            onClick={() => {
              navigate("Allstudents");
            }}
          >
            Add
          </Button>
          <Button sx={{ color: "black", fontSize: "16px", fontWeight: "600" }} onClick={()=> navigate("view")}>
            view
          </Button>
        </div>
      </div>
      <div className="sidebar-header-title">My students</div>
      {mystudents.length === 0 ? (
        <p className="no-student-text">
          No students added yet click on Add button to start grading students
        </p>
      ) : (
        <StudentList mystudents={mystudents} />
      )}
      <div style={{flex:"1.3",justifyContent:"center",alignItems:"center",display:"flex"}}>
        <Button variant="contained" sx={{backgroundColor:"#31363F",'&:hover':{
            backgroundColor:'grey'
        }}} onClick={handleSubmit}>Submit grading</Button>
      </div>
    </div>
  );
};

export default Sidebar;
