import { Company } from "../models/companyModel.js";

export const  registerCompany=async(req,res)=>{
    try {
        
        const {companyName}=req.body;
        if(!companyName)
        {
          return  res.status(201).json({
                message:"Company name is required",
                success:false
            })
        }

        let company =await Company.findOne({name:companyName})

        if(company)
        {
            return res.status(400).json({
                message:"you can't register same company",
                success:false
            })
        }

        company =await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(201).json({
            message:"Company Registered Successfully !!!",
            company,
            success:true
        })

    } catch (error) {
        console.log("Error in try block");
        
    }
}

export const getCompany=async(req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({userId})
        if(!companies){
            return res.status(401).json({
                message:"Company not found !!!",
                success:false
            })
        }
        return res.status(200).json({
            message: "Companies retrieved successfully",
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
}

//get company by id 

export const getCompanyById=async(req,res)=>
{
    try {
        const comapanyId=req.params.id;
        const company=await Company.findById(comapanyId)
        if(!company){
            return res.status(401).json({
                message:"Company not found !!!",
                success:false
            })
        }
        return res.status(201).json({
            company,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}


// export const updateCompany=async(req,res)=>{
//     try {
//         const {name,description,location,website}=req.body;
//         const file=req.file // cloudnary 

//         const updateData={name,description,location,website}

//         const company=await Company.findOneAndUpdate(req.params.id,updateData,{new:true});
//         if(!company){
//             return res.status(401).json({
//                 message:"company not found ",
//                 success:false
//             })
//         }

//         return res.status(201).json({
//             message:"Company information updated !!!",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
        
//     }
// }

export const updateCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;
        const file = req.file; // Use file for Cloudinary or other file storage services

        // Create an update object, only including fields that have values
        const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(location && { location }),
            ...(website && { website }),
            ...(file && { logo: file.path }) // Assuming `file.path` contains the uploaded file path
        };

        // Find and update the company by ID with the new data
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error in updateCompany:", error);
        res.status(500).json({
            message: "An error occurred while updating company information",
            success: false
        });
    }
};
