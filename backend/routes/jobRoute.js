import express from 'express'
import { jobPost,getAllJobs,getJobById,getAdminJobs } from '../controlers/jobControler.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
const router=express.Router()


router.post("/jobpost",isAuthenticated,jobPost)
router.get("/getalljobs",isAuthenticated,getAllJobs)
router.get("/getAdminJobs",isAuthenticated,getAdminJobs)
router.get("/getjob/:id",isAuthenticated,getJobById)

export default router