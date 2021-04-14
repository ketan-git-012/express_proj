const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        maxLength : 32
    },

    lastname : {
        type : String,
        required : true,
        maxLength : 32
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    image : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("Trainee", traineeSchema);