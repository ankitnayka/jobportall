import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'



function Navbar() {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/users/logout")
            if (res) {
                dispatch(setUser(null))
                toast.success(res.data.message)
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

                <div>
                    <h1 className='text-2xl font-bold'>job <span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ?
                                (
                                    <><li><Link to='/admin/companies'>Company</Link></li>
                                        <li><Link to='/admin/jobs'>Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to='/'>Home</Link></li>
                                        <li><Link to='/jobs'>Jobs</Link></li>
                                        <li><Link to='/browse'>Browser</Link></li>
                                    </>)
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline'>Login</Button>
                                </Link>
                                <Link to="signup">
                                    <Button className='bg-[#6A38C2] hover:bg-[#2f155c'>SignUp</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        {user && user.role ==='student'? (

                                            <AvatarImage src={user.profile.profilePhoto} />
                                        ):(
                                            <Avatar>
                                            <AvatarImage src="https://5.imimg.com/data5/SELLER/Default/2023/3/294997220/ZX/OC/BE/3365461/acrylic-admin-office-door-sign-board-500x500.jpg" />
                                        </Avatar>
                                        )
                                         
                                        }
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>

                                        <Avatar>
                                            <AvatarImage src="https://5.imimg.com/data5/SELLER/Default/2023/3/294997220/ZX/OC/BE/3365461/acrylic-admin-office-door-sign-board-500x500.jpg" />
                                        </Avatar>
                                        <div >
                                            <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {user && user.role==='student' && 
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logOutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar