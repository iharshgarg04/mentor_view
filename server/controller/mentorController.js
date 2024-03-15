const Marks = require("../models/marks");
const Mentor = require("../models/mentor");
const Student = require("../models/student");

exports.fetchMentors = async(req,res)=>{
  try{
    const response = await Mentor.find({});
    if(!response){
      return res.status(400).json({
        success:false,
        message:"error while fetching mentors",
      })

    }
    return res.status(200).json({
      success:true,
      mentors : response
    })
  }catch(error){
    console.log(error.message);
    console.log("error while fetching mentors");
  }
}

exports.addStudents = async (req, res) => {
  try {
    const { students, mentorId } = req.body;

    if (!students || !mentorId) {
      return res.json({
        error: "all fields are required",
      });
    }
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor is not found",
      });
    }

    if(mentor.locked===true){
        return res.status(400).json({
            success:false,
            message:"You have already submited the evaluation. You can no longer do changes"
        })
    }

    const currentCount = mentor.student.length;
    const newCount = currentCount + students.length;
    console.log(currentCount, newCount);

    if (newCount < 3 || newCount > 4) {
      return res.status(400).json({
        success: false,
        message: "Mentor can only accommodate between 3 to 4 students",
      });
    }

    await Student.updateMany({ _id: { $in: students } },{ $set: { mentorId: mentorId,assigned: true } } ,{new:true});

    mentor.student.push(...students);
    await mentor.save();
    return res.status(200).json({
      success: true,
      message: "student added successfully",
      mentor,
    });
  } catch (error) {
    console.log("error while adding student");
    console.log(error);
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor is not found",
      });
    }

    if(mentor.locked===true){
        return res.status(400).json({
            success:false,
            message:"You have already submited the evaluation. You can no longer do changes"
        })
    }

    await Student.findByIdAndUpdate(
      studentId,
      { assigned: false ,$unset: { mentorId: '' }},
      { new: true }
    );
    const response = await Mentor.findByIdAndUpdate(
      mentorId,
      { $pull: { student: studentId } },
      { new: true }
    ).populate("student");
    await Marks.deleteMany({ student: studentId });

    return res.status(200).json({
      success: true,
      message: "student removed successfully",
      response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.submitAdmin = async(req,res)=>{
    try{
        const {mentorId} = req.body;
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(400).json({
              success: false,
              message: "mentor is not found",
            });
        }
        if(mentor.locked==true){
          return res.status(400).json({
            success:false,
            message: "You have already submited the evaluation. You can no longer do changes"
          })
        }
        const students = mentor.student
        if(students.length===0){
          return res.status(404).json({
            success:false,
            message:"Add students before submit grading"
          })
        }
        // const markspr = students.map(async(studentId)=>{
        //   const mark = await Marks.findOne({student:studentId}).populate("student").lean();
        //   return { studentId, mark };
        // })
        // const studentMarks = await Promise.all(markspr);

        mentor.locked = true;
        await mentor.save();
        return res.status(200).json({
            success: true,
            message: "Marks locked successfully",
            mentor: mentor,
        });
    }catch(error){
        console.log(error.message);
        console.log("error while submiting");
    }
}


