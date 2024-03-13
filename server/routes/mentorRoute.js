const express = require("express");
const { addStudents, removeStudent } = require("../controller/mentorController");
const router = express.Router();

router.post("/addstudents",addStudents);
router.put("/removestudent",removeStudent);

module.exports = router;