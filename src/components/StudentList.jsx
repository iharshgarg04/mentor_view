import React, { useContext } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { myContext } from "../pages/dashBoard/DashBoard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshSidebarfun } from "../features/refreshSlice";
import { toast } from "react-toastify";

const StudentList = ({ mystudents }) => {
  const { student, setStudent } = useContext(myContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentor = JSON.parse(localStorage.getItem("mentorData"));
  const handleDelete = async(student) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/mentor/removestudent",
        {
          mentorId: mentor._id,
          studentId: student._id,
        }
      );
      if (response.status === 200) {
        toast.success("student removed successfully");
        dispatch(refreshSidebarfun());
      }
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="sidebar-list">
      {mystudents.map((stu, index) => (
        <div
          key={index}
          className="student-sidebar-list"
          onClick={() => {
            setStudent(stu);
            navigate("marks");
          }}
        >
          {stu.name}
          <div className="student-sidebar-icons">
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                  color: "black !important",
                  zIndex:"2"
                },
              }}
              onClick={(e)=>{
                e.stopPropagation();
                setStudent(stu);
                navigate("editOrAdd")
              }}
            >
              <EditNoteIcon />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                  color: "black !important",
                  zIndex:"20"
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
               { mystudents.length>3 ? handleDelete(stu): toast.error("AtLeast 3 stundets are required")}
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
