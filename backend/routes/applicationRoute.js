import express from 'express'
import { applyJob,getApplicants,getAppliedJobs,updateStatus} from '../controlers/applicationControler.js'
import isAuthenticated from '../middleware/isAuthenticated.js' 
const router=express.Router()

router.post("/applyjob/:id",isAuthenticated,applyJob)
router.get("/getappliedjobs",isAuthenticated,getAppliedJobs)
router.get("/:id/getapplicants",isAuthenticated,getApplicants)
router.post("/:id/updatestatus",isAuthenticated,updateStatus)

export default router