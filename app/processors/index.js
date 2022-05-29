const Queue = require('bull');
const path = require('path');

const { REDIS_PORT, REDIS_URL } = require('../config/redisCrediential');
const emailQueue = new Queue('emailQueue',{
    redis:{
        port:REDIS_PORT,
        host:REDIS_URL
    }
})

emailQueue.process(path.join(__dirname, 'emailQueueProccesor.js'));

emailQueue.on('completed', (job) =>{
    console.log(`completed ${job.id} Job` );
})

