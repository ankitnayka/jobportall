import express from 'express'
import {registerCompany,getCompany,getCompanyById,updateCompany} from '../controlers/companyControle.js'
import isAuthenticated from '../middleware/isAuthenticated.js';
const router=express.Router()


router.post("/registerCompany",isAuthenticated,registerCompany);

router.get("/getCompany",isAuthenticated,getCompany);

router.get("/getCompanyById/:id",isAuthenticated,getCompanyById);

router.put("/updateCompany/:id",isAuthenticated, updateCompany);

export default router