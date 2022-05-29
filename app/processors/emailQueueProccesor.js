const res = require('express/lib/response');
const sendEmailUserCreationEmail = require('../mail/sendAccountCreationMail');

const emailQueueProccesor = async (job, done) =>{
    // console.log(job.data.user)

    try {
        const {username, email, name } = job.data.user;

        await sendEmailUserCreationEmail({
            username,
            email, 
            name
        });
        done();
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:error||'Error'
        })
    }

    
}

module.exports = emailQueueProccesor;