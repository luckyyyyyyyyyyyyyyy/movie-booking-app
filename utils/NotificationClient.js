const nodemailer = require('nodemailer');

const sendEmail = (emailIds, subject, html, text)=>{

    const reqEmailString = emailIds.reduce( (acc,email)=>  acc +  (acc?", ":"") + (email),"");

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:"chandu16.538@gmail.com",
            pass: 'lwnicotsnqxltecu'
        }
    });
     
    let mailDetails = {
        from: 'chandu16.538@gmail.com',
        to: reqEmailString,
        subject: subject,
        attachments:[
            {
                filename:'test file.jpg',
                path :'https://img.ragalahari.com/sep2021/gallery/bheemla-nayak/bheemla-nayak86.jpg'
            }
        ]
    };

    if(html){
        mailDetails.html=html;
    }

    if(text){
        mailDetails.text=text;
    }
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs'+err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports={
    sendEmail
}

