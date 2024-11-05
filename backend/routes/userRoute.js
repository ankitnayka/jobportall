import express from 'express'
import {register,login,logout,updateProfile} from '../controlers/userControle.js'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router=express.Router();


router.post('/register',singleUpload,register);

router.post('/login',login);

router.get('/logout',logout);

router.post('/updateProfile',isAuthenticated,singleUpload,updateProfile);


export default router