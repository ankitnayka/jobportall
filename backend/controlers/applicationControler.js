import { populate } from 'dotenv';
import {Application} from '../models/applicationModel.js'
import {Job} from '../models/jobModel.js'

export const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                success:false
            })
        }
        //check if the user already apply for job
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                message:"you have already apply for this job",
                success:false
            })
        }

        //check if the job exist 
        const job =await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message:" job not exist",
                success:false
            })
        }

        //create a new application
        const newApplication= await Application.create({
            job:jobId,
            applicant:userId
        })
        job.applications.push(newApplication._id);
        await job.save()
        
        return res.status(200).json({
            message:"Job apply successfully !!!",
            newApplication
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
           }
        })

        if(!application){
            return res.status(404).json({
                message:"No application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

// Admin access the how many user apply for particular job

export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                options:{sort:{createdAt:-1}},
            }
        })
        if(!job){
            return res.status(404).json({
                success:false,
                message:"No one apply for this job"
            })
        }

        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


// status of application

export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(401).json({
                message:"status is required",
                success:false
            })
        }

        //find the application by applicaation id

        const application=await Application.findOne({_id:applicationId})
        if(!application)
        {
            return res.status(401).json({
                message:"application not found",
                success:false
            })
        }

        //update status
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status upadated successfully !!",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}