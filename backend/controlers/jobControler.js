
import {Job} from '../models/jobModel.js'



export const jobPost=async(req,res)=>{
    try {
        const {title,description,requirements,experienceLevel,salary,location,jobType,position,company}=req.body;
        const userId=req.id;
        if(!title || !description || !experienceLevel || !requirements || !salary || !location || !jobType || !position || !company){
            return res.status(401).json({
                message :"All fields required !1",
                success :false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            location,
            experienceLevel,
            salary:Number(salary),
            jobType,
            position,
            company:company,
            created_by:userId
        })

        res.status(201).json({
            message: "Job created successfully!",
            success: true,
            job
        });
    } catch (error) {
        console.log(error);    
    }
}


export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }

        const jobs =await Job.find(query).populate({
            path:"company"}).sort({createdAt:-1})
        if(!jobs){
            return res.status(401).json({
                message:"jobs not found !!",
                success:false
            })
        }

        return res.status(200).json({
            success:true,
            jobs
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({

            path:"application"
        }
        )
        if(!job){
            return res.status(401).json({
                message:"job not found",
                success:false
            })
        }

        return res.status(200).json({job,success:true})
    } catch (error) {
        console.log(error);    
    }
}

export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId})

        if(!jobs)
        {
            return res.status(400).json({
                message:"Jobs not found admin",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}