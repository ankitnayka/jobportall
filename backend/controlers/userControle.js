import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudnary.js'

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body
        console.log(fullName, email, phoneNumber, password, role);
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(401).send({
                message: "All field Required Bansari",
                success: false
            })
        }

        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)

        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).send({
                message: "email already exist !!!",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
                
            }
        })

        return res.status(200).send({
            message: "Account Create Successfull.",
            success: true
        })


    } catch (error) {
        console.log("Somthing wrong in try blockkkk");

    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(401).send({
                message: "All field Required !!!",
                success: false
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({
                message: "email or password not exist !",
                success: false
            })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            return res.status(400).send({
                message: "Password not match",
                success: false
            })
        }

        if (role != user.role) {
            return res.status(401).send({
                message: "Account doesn't exist with current Role",
                success: false
            })
        }


        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role:user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `welcome back ${user.fullName}`,
                user,
                success: true
            })




    } catch (error) {
        console.log("Somthing wrong in try block");
    }
}

export const logout = async (req, res) => {

    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout done...",
            success: true
        })

    } catch (error) {
        console.log('Logout not work try also');

    }
}


export const updateProfile = async (req, res) => {
    try {

        const { fullName, email, phoneNumber, bio, skills } = req.body;
        console.log(fullName,email);
        //clodinary
        const file = req.file;
        const fileUri=getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        let skillArray;
        if (skills) {
            skillArray = skills.split(",");
        }
        const userId = req.id; //middleware authonitaction

        let user = await User.findById(userId)


        //update data

        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillArray


        //resume comes later
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url//save the cloudinary uri
            user.profile.resumeOriginalName=file.originalname
        }


        await user.save();


        //return the user
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile details updated",
            user,
            success: true
        })
    } catch (error) {
        console.log("error in try catch block banari");

    }
}