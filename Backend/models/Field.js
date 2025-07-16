const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Add A Field Name"]
    },
    area:{
        type:String,
        required:[true,"Please add the area in acres or hectares"]
    },
    
    location:{
        type:String,
    },
    // This is The Filed to the user who owns it 
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User',
    }
},{
    timestamps:true,
})

module.exports =  mongoose.model('Field',fieldSchema);