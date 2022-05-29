const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./app/mail/transporter');
require('./app/processors/index');


const app = express();

var corsOption = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE"
}

app.use(cors());

// request of content type application/json
app.use(bodyParser.json());

// request of content type application/x-www-form-urlcoded
app.use(bodyParser.urlencoded({extended:true}));

// simple route working
app.get('/', (req, res) =>{
    res.send({
        message:'Welcom to send email in node js'
    })
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

const db = require('./app/model');

// router
const userRoute = require('./app/router/user.router');


app.use('/api/v1/user', userRoute)

// set port listing for requetst
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})