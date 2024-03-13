const express = require("express");
const { addStudents, removeStudent, submitAdmin } = require("../controller/mentorController");
const router = express.Router();

router.post("/addstudents",addStudents);
router.put("/removestudent",removeStudent);
router.post("/submit",submitAdmin);

module.exports = router;