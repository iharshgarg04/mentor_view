const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const studentRoute = require('./routes/studentRoute');
const mentorRoute = require('./routes/mentorRoute');
const dotenv = require("dotenv");
const Mentor = require('./models/mentor')
const Student = require('./models/student')

const app = express();
app.use(express.json());
app.use(cors({
    origin:"*",
}))
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use('/student',studentRoute);
app.use('/mentor',mentorRoute);

const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connectting to db");
        console.log(error);
    }
}

connectDb();

// Student.create({name:"Ishika",email:"Ishika@gmail.com",mentorId:null,totalMarks:0,assigned:false});
// Mentor.create({name:"Shubham",student:[],locked:false});


app.listen(PORT,()=>{
    console.log(`server is successfully running on port ${PORT}`);
})