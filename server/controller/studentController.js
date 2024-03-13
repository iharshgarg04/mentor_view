const Marks = require('../models/marks');
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
        const {studentId,viva,ideation,execution,projectManagement,teamWork} = req.body;
        if(!studentId || !viva || !ideation || !execution || !projectManagement || !teamWork){
            return res.status(400).send("All fields are requires");
        }

        const totalMarks = viva + ideation + execution + projectManagement + teamWork;

        const marks = new Marks({student:studentId,viva:viva,ideation:ideation,execution:execution,projectManagement:projectManagement,teamWork:teamWork,totalMarks:totalMarks});
        const response = await marks.save();
        console.log(response);

        const populatedMarks = await response.populate("student");


        if(!populatedMarks){
            return res.status(400).send("Error while adding marks")
        }

        return res.status(200).json({
            success:true,
            message:"Marks are added successfully",
            marks: populatedMarks
        })


    }catch(error){
        console.log(error.message);
        console.log("error while adding marks");
    }
}

