const Marks = require('../models/marks');
const Mentor = require('../models/mentor');
const Student = require('../models/student');

exports.addStudents = async(req,res)=>{
    try{
        const {students,mentorId} = req.body;

        if(!students || !mentorId){
            return res.json({
                error:"all fields are required",
            })
        }
        const mentor = await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(400).json({
                success:false,
                message:"mentor is not found",
            })
        }

        const currentCount = mentor.student.length;
        const newCount = currentCount + students.length;
        console.log(currentCount,newCount)

        if(newCount<3 || newCount>4){
            return res.status(400).json({
                success:false,
                message:"Mentor can only accommodate between 3 to 4 students"
            })
        }

        await Student.updateMany({_id:{$in:students}},{assigned:true});

        mentor.student.push(...students);
        await mentor.save();
        return res.status(200).json({
            success:true,
            message:"student added successfully",
            mentor
        })

    }catch(error){
        console.log("error while adding student");
        console.log(error);
    }
}

exports.removeStudent = async(req,res)=>{
    try{
        const{studentId,mentorId} = req.body;
        const mentor = await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(400).json({
                success:false,
                message:"mentor is not found"
            })
        }
        

        await Student.findByIdAndUpdate(studentId,{assigned:false},{new:true});
        const response = await Mentor.findByIdAndUpdate(mentorId,{$pull:{student:studentId}},{new:true}).populate("student")
        await Marks.deleteMany({ student: studentId });
         
        return res.status(200).json({
            success:true,
            message:"student removed successfully",
            response,
        })
    }catch(error){
        console.log(error.message);
    }
}

