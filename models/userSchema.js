const { default: mongoose } = require("mongoose");

const userData = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
   
});

const userCollection = mongoose.model("User",userData).collection;

module.exports = userCollection;