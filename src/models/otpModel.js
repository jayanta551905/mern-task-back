const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email:{
        type: String
    },
    otp:{
        type: String
    },
    status:{
        type: Number,
        default: 0
    },
    createdDate:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true,versionKey:false});
const otpModel = mongoose.model("otps", otpSchema);
module.exports = otpModel;