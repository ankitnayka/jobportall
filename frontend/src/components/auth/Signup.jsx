import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react';

function SignUp() {
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })
  
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }
  
  const changeFileHandler = (e) => {
    setInput({...input, file: e.target.files?.[0]});
  }


  const handleSubmit = async (e) => {
      
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    if (input.file) {
      formData.append("file", input.file);
    }
    
    try {
      dispatch(setLoading(true))
      const res = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          
          {/* Full Name */}
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type='text'
              placeholder='Ankit Arvindbhai Nayka'
              value={input.fullName}
              onChange={changeEventHandler}
              name="fullName"
            />
          </div>

          {/* Email */}
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              placeholder='Enter an email address'
              value={input.email}
              onChange={changeEventHandler}
              name="email"
            />
          </div>

          {/* Phone Number */}
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type='number'
              placeholder='Enter a phone number'
              value={input.phoneNumber}  // Fixed typo in the state
              onChange={changeEventHandler}
              name="phoneNumber"  // Fixed typo in the name attribute
            />
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder='Enter a password'
              value={input.password}
              onChange={changeEventHandler}
              name="password"
            />
          </div>

          {/* Role (Student/Recruiter) */}
          <div className='flex items-center justify-centermy-2'>
            <RadioGroup className='flex items-center justify-center my-2'>
              
              {/* Student Option */}
              <div className="flex items-center justify-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="option-one">Student</Label>
              </div>

              {/* Recruiter Option */}
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"  // Corrected spelling of recruiter
                  name="role"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Profile Image Upload */}
            <div className='flex mx-4 items-center gap-2'>
              <Label> <span className='text-[#F83002] font-bold'>Profile</span> </Label>
              <Input
                type="file"
                accept="image/*"
                className='cursor-pointer'
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          {
            loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>please wait..</Button>:
          <Button className='w-full my-2' type="submit">Sign up</Button>
          }

          {/* Redirect to Login */}
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-700 font-bold'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
