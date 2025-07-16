const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a Crop name"]
    },
    variety:{
        type:String
    },
    sowingDate:{
        type:Date
    },
    harvestDate:{
        type:Date
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Field',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('Crop',cropSchema);