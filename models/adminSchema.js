const { default: mongoose } = require("mongoose");

const adminData = mongoose.Schema({
    adminname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
   
});

const adminCollection = mongoose.model("admin",adminData).collection;

module.exports = adminCollection;