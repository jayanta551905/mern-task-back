const otpModel = require("../models/otpModel");
const usersModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const sendEmailUtility = require("../utility/sendEmailUtility");
// registration
exports.registration = (req, res) => {
    let reqBody = req.body;
    usersModel.create(reqBody, (err, data)=>{
        if (err){
            res.status(200).json({status: 'Fail', data: err});
        }
        else{
            res.status(200).json({status: 'Success', data: data});
        }
    });
}

// user login
exports.login=(req,res)=>{
    let reqBody=req.body
    let {email, password} = reqBody;
    if(email&&password){
        usersModel.aggregate([
            {$match:reqBody},
            {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
        ],(err,data)=>{
            if(err){
                res.status(400).json({status:"fail",data:err})
            }
            else {
                if(data.length>0){
                    let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]['email']}
                    let token = jwt.sign( Payload,'SecretKey123456789');
                    res.status(200).json({status:"success",token:token,data:data[0]})
                }
                else {
                    res.status(401).json({status:"unauthorized"})
                }
            }
        })
    }
    else{
        console.log("not found")
    }
    
}


// user profile update
exports.profileUpdate = (req, res) => {
    let email = req.headers['email'];
    let reqBody = req.body;
    usersModel.updateOne({email:email}, reqBody, (err, data) => {
        if (err){
            res.status(400).json({status: 'Fail', data: err});
        }
        else{
            res.status(200).json({status: 'Success', data: data});
        }
    })

}


//get profile details
exports.profileDetails=(req,res)=>{
    let email= req.headers['email'];
    usersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}


exports.recoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let otpCode = Math.floor(100000 + Math.random() * 900000)
    try {
        // Email Account Query
        let userCount = await usersModel.aggregate([{$match: {email: email}}, {$count: "total"}])
        if(userCount.length>0){
            // OTP Insert
            let createOTP = await otpModel.create({email: email, otp: otpCode})
            // Email Send
            let sendEmail = await sendEmailUtility(email,"Task Manager PIN Verification", "Your PIN Code is= "+otpCode)
            res.status(200).json({status: "success", data: sendEmail})
        }
        else{
            res.status(200).json({status: "fail", data: "No User Found"})
        }

    }catch (e) {
        res.status(200).json({status: "fail", data:e})
    }

}

exports.reocovarVeryfiOTP = async (req, res) => {
    let email = req.params.email;
    let otpCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;

    try{
        let otpCount = await otpModel.aggregate([{$match: {email: email, otp: otpCode, status: status}}, {$count: "total"}])
        if (otpCount.length>0) {
            let otpUpdate = await otpModel.updateOne({email: email, otp: otpCode, status: status}, {
                email: email,
                otp: otpCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: otpUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}


exports.recoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let otpCode = req.body['OTP'];
    let newPass =  req.body['password'];
    let statusUpdate=1;

    try {
        let otpUsedCount = await otpModel.aggregate([{$match: {email: email, OTP: otpCode, status: statusUpdate}}, {$count: "total"}])
        if (otpUsedCount.length>0) {
            let passUpdate = await usersModel.updateOne({email: email}, {
                password: newPass
            })
            res.status(200).json({status: "success", data: passUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid Request"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}