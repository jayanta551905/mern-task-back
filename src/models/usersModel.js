const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    email:{
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required']
    },
    firstName:{
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    lastName:{
        type: String,
        trim: true,
        required: [true, 'Last name is required']
    },
    mobile:{
        type: String,
        trim: true,
        required: [true, 'Phone number is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    photo:{
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true,versionKey:false});

const usersModel = mongoose.model('users', dataSchema);
module.exports = usersModel;