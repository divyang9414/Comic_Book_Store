const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Book')

const db = mongoose.connection

db.on('connected', (err)=>{
    if(err){
        console.log('database is successfully NOT connected..!!');
        return false;
    }
    console.log('database is successfully connected..!!');
})

module.exports = db;