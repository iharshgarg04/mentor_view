const express = require("express");
const router = express.Router();
const {fetchStudents, addMarksOrUpdate, fetchMyStudents} = require('../controller/studentController');

router.get("/",fetchStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);

module.exports = router;