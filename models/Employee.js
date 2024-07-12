const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    f_Id: {
        type: String,
        required: true
    },
    f_Image: {
        type: String
    },
    f_Name: {
        type: String,
        required: true
    },
    f_Email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    f_Mobile: {
        type: Number,
        required: true
    },
    f_Designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales']
    },
    f_gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    f_Course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC']
    },
    f_Createdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Employee", employeeSchema);
