import React, { useContext, useEffect } from "react";
import "./marksheet.css";
import { myContext } from "../dashBoard/DashBoard";
import { useState } from "react";
import axios from "axios";

const Marksheet = () => {
  const { student, setStudent } = useContext(myContext);
  const [marksheet, setMarksheet] = useState({});
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/student/fetchMarks",
          {
            headers: {
              student: student._id,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setMarksheet(response.data.student);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMarks();
  }, [student]);
  return (
    <div className="marksheet-container">
    <div className="marksheet-box">
      <div>
        <h2>Marksheet</h2>
      </div>
      <div className="marks-list">
        <p>Viva : {marksheet ?  marksheet.viva: "NA"}</p>
        <p>Ideation : {marksheet ?  marksheet.ideation: "NA"}</p>
        <p>Execution : {marksheet ?  marksheet.execution: "NA"}</p>
        <p>Project Management : {marksheet ?  marksheet.projectManagement: "NA"}</p>
        <p>Team Work : {marksheet ?  marksheet.teamWork: "NA"}</p>
        <p>Total Marks : {marksheet ?  marksheet.totalMarks: "NA"}</p>
      </div>
    </div>
    <p className="add-marks-text">
      Click on the edit icon to edit or add marks for the student.
    </p>
  </div>
  );
};

export default Marksheet;
