const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    f_sno:{
        type:Number,
        required:false,
    },
    f_userName:{
        type: String,
		required: true,
        unique: true 
		
    },
    f_Pwd:{
        type:String,
        required: true,
    },
    token :{
        type:String,
    },
})

module.exports = mongoose.model("Login", LoginSchema);