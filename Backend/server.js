const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js')
const authRouter = require('./routes/authRouter.js')
const fieldRoutes = require('./routes/fieldRoutes.js')
const cropRoutes = require('./routes/cropRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')

dotenv.config()
connectDB()

const app =  express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}));


app.use('/api/auth', authRouter);
app.use('/api/fields',fieldRoutes);
app.use('/api/crops',cropRoutes);
app.use('/api/tasks',taskRoutes);


// app.get('/',(req,res)=>{
//     res.send("User Res")
// })


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Lisetent On port No: ${PORT}`);
    
})