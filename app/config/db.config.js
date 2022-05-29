module.exports ={
    HOST:'localhost',
    USER:'root',
    PASSWORD:'',
    DB:'sendemailqueues',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idel: 10000
    }
}