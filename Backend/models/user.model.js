const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please fill You Name"],
    },
    email:{
        type:String,
        required:[true,"Please fill Your Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please fill Your password"],
    },
},{
    timestamps:true
})

userschema.pre('save', async function(next){
    if(!this.isModified(this.password)) return next();
    const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password,salt);
    next()
})

userschema.methods.matchPassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

module.exports = mongoose.model('User',userschema)