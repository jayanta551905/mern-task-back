const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    description:{
        type: String
    },
    status:{
        type: String,
        default: "new"
    },
    email:{
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now()
    }
}, {timestamps:true,versionKey:false});


const tasksModel = mongoose.model('tasks', dataSchema);
module.exports = tasksModel;