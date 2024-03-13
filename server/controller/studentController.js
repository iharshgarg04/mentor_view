const Student = require('../models/student');

exports.fetchStudents = async(req,res)=>{
    try{
        const response = await Student.find({assigned:false});
        if(!response){
            res.status(400).json({
                success:"false",
                message:"error while fetching students",
            })
        }

        res.status(200).json({
            success:"true",
            response
        })

    }catch(error){
        console.log("error while fetching students");
    }
}

exports.addMarks = async(req,res)=>{
    try{

    }catch(error){
        
    }
}

