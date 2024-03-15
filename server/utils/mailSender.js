const nodemailer = require('nodemailer');

const mailSender = async(email,title , body)=>{
    try{        

        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:false,
        })

        let info = transporter.sendMail({
            from: `MentorView <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        // console.log(info.response,"response");
        return info;
    }catch(error){
        console.log(error.message);
        return error.message;
    }
}

module.exports = mailSender