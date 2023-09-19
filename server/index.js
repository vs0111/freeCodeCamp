const express = require('express')
const cors = require('cors')
const connection=require('./config/db')
const userRouter=require('./routes/userRouter')
require('dotenv').config()
const app=express()
connection()

app.use(express.json())
app.use(cors())


// app.use('/',userRouter)
app.use('/api/user',userRouter)
app.use('/api/course',userRouter)


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Connected to PORT=> ${port}`);
})