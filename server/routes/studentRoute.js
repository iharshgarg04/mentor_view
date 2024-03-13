const express = require("express");
const router = express.Router();
const {fetchStudents, addMarks} = require('../controller/studentController');

router.get("/",fetchStudents);
router.post("/marks",addMarks);

module.exports = router;