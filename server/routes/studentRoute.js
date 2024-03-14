const express = require("express");
const router = express.Router();
const {fetchStudents, addMarksOrUpdate, fetchMyStudents, fetchMarks} = require('../controller/studentController');

router.get("/",fetchStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);
router.get("/fetchMarks",fetchMarks);

module.exports = router;
