const express = require("express");
const router = express.Router();
const {fetchStudents, addMarksOrUpdate, fetchMyStudents, fetchMarks, fetchAllStudents} = require('../controller/studentController');

router.get("/",fetchStudents);
router.get("/all",fetchAllStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);
router.get("/fetchMarks",fetchMarks);

module.exports = router;
