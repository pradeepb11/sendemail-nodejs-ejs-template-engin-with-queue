const express = require('express');

const router = express.Router();

const userController = require('../controller/user.controller');

// create
    router.post('/', userController.createUsers);

// get all Users    
    router.get('/', userController.getAllUsers);

// send email to Users 
    router.post('/sendEmailToUsers', userController.sendEmailToUsers)

    module.exports = router;