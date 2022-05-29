const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "114009a67ae007",
      pass: "f009f4c0ee8e41"
    }
})


// checking connection

transporter.verify((error, success)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Mail Server Is Running...')    
    }
})


module.exports = transporter;