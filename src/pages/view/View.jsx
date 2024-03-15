import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./view.css";
import axios from "axios";
import { Assignment } from "@mui/icons-material";

const View = () => {
  const [Students, setStudents] = useState([]);
  const [assigned, setAssigned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_URL}/student/all`);
      setStudents(response.data.response);
      console.log(response, "hii all");
      setLoading(false);
    };
    fetchAllStudents();
  }, []);

  const handleAssignedButtonClick = () => {
    setAssigned(true);
  };

  const handleUnassignedButtonClick = () => {
    setAssigned(false);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#31363F",
            "&:hover": { backgroundColor: "grey" },
          }}
          onClick={handleAssignedButtonClick}
        >
          Assigned Students
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#31363F",
            "&:hover": { backgroundColor: "grey" },
          }}
          onClick={handleUnassignedButtonClick}
        >
          {" "}
          Unassinged Students
        </Button>
      </div>
      <div>
        {assigned ? (
          <p className="view-title">Assinged Students</p>
        ) : (
          <p className="view-title">Unassinged Students</p>
        )}
      </div>
      {loading ? <CircularProgress className="circular-progress"/> :
      Students.map((student, index) =>
        assigned ? (
          student.assigned ? (
            <div key={index} className="student-list-view">
              <div className="students-view-list">
                {student.name}
                <div style={{ display: "flex", gap: "10px" }}>
                  Total Marks Assinged{" "}
                  <p style={{ fontWeight: "bold" }}>{student.totalMarks}</p>
                </div>
              </div>
            </div>
          ) : null
        ) : !student.assigned ? (
          <div key={index} className="student-list-view">
            <div className="students-view-list">{student.name}</div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default View;
