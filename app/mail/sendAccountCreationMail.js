const path = require('path');
const ejs = require('ejs');
const transporter = require('../mail/transporter');

const sendUserCreationEmail = async ({username, email, name}) =>{
    const templatePath = path.join(__dirname, '../view/AccountCreated.ejs');

    const data = await ejs.renderFile(templatePath,{
        username, email, name
    })
    const mailOptions = {
        from: '"Pradeep Bhosle" pradeep.bhosle8@gmail.com',
        to: email,
        subject: 'Account Activated',
        html: data
    };

    await transporter.sendMail(mailOptions);
}




module.exports = sendUserCreationEmail;