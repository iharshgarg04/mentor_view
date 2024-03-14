const express = require("express");
const { addStudents, removeStudent, submitAdmin, fetchMentors } = require("../controller/mentorController");
const router = express.Router();

router.get("/fetchMentors",fetchMentors);
router.post("/addstudents",addStudents);
router.put("/removestudent",removeStudent);
router.post("/submit",submitAdmin);

module.exports = router;