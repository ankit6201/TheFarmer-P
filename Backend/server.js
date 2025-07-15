const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const authenticationRouter = require('./routes/authenticationRouter')

dotenv.config()
connectDB()

const app =  express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/api/authentication',authenticationRouter)

app.get('/',(req,res)=>{
    res.send("User Res")
})


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Lisetent On port No: ${PORT}`);
    
})