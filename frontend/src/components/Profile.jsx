import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'



function Profile() {
    const isResume=true;
    const [open,setOpen]=useState(false)
    const {user}=useSelector(store=>store.auth)
    const skills=user.profile.skills
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5  p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user.profile.profilePhoto} />
                        </Avatar>
                        <div className=''>
                            <h1 className='font-bold text-xl'>{user.fullName}</h1>
                            <p className='text-gray-500'>{user.profile.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} className='text-right' variant="outline"><Pen /></Button>
                </div>
                <div className='flex  items-center my-5 gap-3'>
                    <Mail />
                    <span>{user.email}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <Contact />
                    <span>{user.phoneNumber}</span>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-orange-600'>Skills</h1>
                    <div className='flex items-center gap-3'>
                    {
                        skills.lenght !=0 ? skills.map((item,index)=><Badge key={index}>{item}</Badge>): <span>NA</span>
                    }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1 my-5'>
                        <Label className='text-md font-bold'>Resume</Label>
                        {
                            isResume ? <a target='blank' href={user.profile.resume} className=' font-bold text-blue-600 w-full hover:underline'>{user?.profile?.resumeOriginalName} </a> :
                            <span>NA</span>
                        }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                        <h1 className='font-bold my-5 text-lg'>Applied Job</h1>
                        {/* Application Table */}
                        <AppliedJobTable/>
                </div>
                    {/* update/edit  profile details  */}
                    <UpdateProfileDialog open={open} setOpen={setOpen}/>
            </div>
        </div>
    )
}

export default Profile