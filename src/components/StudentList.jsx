import React from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const StudentList = ({ mystudents }) => {
  return (
    <div className="sidebar-list">
      {mystudents.map((student, index) => (
          <div key={index} className="student-sidebar-list">
            {student.name}
            <div className="student-sidebar-icons">
              <IconButton>
                <EditNoteIcon/>
              </IconButton>
              <IconButton>
                <DeleteIcon/>
              </IconButton>
            </div>
          </div>
      ))}
    </div>
  );
};

export default StudentList;
