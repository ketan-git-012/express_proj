const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        maxLength : 32
    },
    lastname : {
        type : String,
        require : true,
        maxLength : 32
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("User", userSchema);