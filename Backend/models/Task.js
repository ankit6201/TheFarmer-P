const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Add A Task Title"]
    },
    description:{
        type:String,
    },
    date:{
            type:Date,
            required:[true,"Please Add A Date"]
        },
      status:{
        type:String,
        // required:[true,"Please Select any Feild"]
        enum:['pending','In progress','Completed'],
        default:'pending'
      }  ,
      field:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Field',
      },
      crop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Crop'
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
      }

},{
    timestamps:true
})

module.exports = mongoose.model('Task',taskSchema);