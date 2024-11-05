import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const dispatch=useDispatch();
    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map((skill) => skill),
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(input);
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {

            const res = await axios.post("http://localhost:8000/api/v1/users/updateProfile", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                },
                withCredentials: true
            })

            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            
        }
            setOpen(false)
    }


    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4  py-4 '>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />

                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                                <Label htmlFor="number">Phone Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    type="text"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                                <Label htmlFor="skills">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                                <Label htmlFor="file">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    // accept="application/pdf"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' />please wait..</Button> :
                                    <Button className='w-full my-2' type="submit">Update Profile</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog