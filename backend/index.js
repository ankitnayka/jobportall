import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/jobRoute.js'
import applicationRoute from './routes/applicationRoute.js'

dotenv.config({})

const app=express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// const corsOptions={
//     origin:'http//localhost:5173',
//     credentials:true
// }
// app.use(cors(corsOptions))


const corsOptions = {
    origin: 'http://localhost:5173', // Make sure this URL is correct
    credentials: true,
};
app.use(cors(corsOptions));


//databse
connectDB();
const PORT= process.env.PORT ||3000;


//api 
app.use("/api/v1/users",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/jobs",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})