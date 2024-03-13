const express = require("express");
const router = express.Router();
const {fetchStudents, addMarksOrUpdate} = require('../controller/studentController');

router.get("/",fetchStudents);
router.post("/marks",addMarksOrUpdate);

module.exports = router;