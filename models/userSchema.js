const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    idNum : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    charName : {
        type : String,
        required : true
    },
    roleName : {
        type : String,
        required : true
    },
    firstAppearance : {
        type : String,
        required : true
    },
    publisher : {
        type : String,
        required : true
    }
})

const user = mongoose.model('booksTable',userSchema);
module.exports = user; 