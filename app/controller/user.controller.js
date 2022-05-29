const db = require('../model');

const Users =  db.users;
var bcrypt = require('bcryptjs');
const sendUserCreationEmail = require('../mail/sendAccountCreationMail');

// queue 
const Queue = require('bull');
const { REDIS_PORT, REDIS_URL } = require('../config/redisCrediential');
const emailQueue = new Queue('emailQueue',{
    redis:{
        port:REDIS_PORT,
        host:REDIS_URL
    }
})


// create users 
exports.createUsers = async (req, res) =>{
    const userDate ={
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        name: req.body.name
    }

   try {
    const emailExists = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if(emailExists) return res.send({
            message:"Email already registered"
        })
      
       const User = await Users.create(userDate)
       await sendUserCreationEmail({
        username: req.body.username, 
        email: req.body.email,
        name: req.body.name
       })
    //    console.log(sendUserCreationEmail)
       res.status(200).send(User)
   } catch (error) {
       console.log(error)
       res.status(400).json(error);
   }
         
}

// rretrive all users\
exports.getAllUsers = async (req, res) =>{

    await Users.findAll({
        attributes:['id','name', 'email', 'username']
    })
          .then((data)=>{
              console.log(data)
            res.status(200).send(data)
          })
          .catch(err =>{
              res.status(500).send({
                  message:'Some Error'
              })
          })
}

// send email to 
exports.sendEmailToUsers = async (req, res) =>{
    try {
        const users = await Users.findAll()
        const emailExists = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
      
        console.log(emailExists)
            // console.log(users)
        // users.forEach((user, index) => {
          
        //     emailQueue.add({
        //         user
        //     }).then(() =>{
        //         if(index+ 1 === users.length ){
        //             res.status(200).send({
        //                 message:'All Users are added to queue.'
        //             })
        //         }
        //     })
        // });
    
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Send Email Error'
        })
    }
}