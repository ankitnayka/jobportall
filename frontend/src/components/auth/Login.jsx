import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from '../ui/input';
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [error, setError] = useState(""); // Error state to store error message


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message before making the request
    try {
      dispatch(setLoading(true))
      
      const res = await axios.post('http://localhost:8000/api/v1/users/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      
      if (res.data.success) {
        dispatch(setUser(res.data.user));
           console.log(res.data.user);
           
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (error.response && error.response.status === 400) {
        setError("Invalid request. Please check your input.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Log in</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder='Enter an email address'
            />
          </div>

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

          <div className='flex items-center justify-center my-2'>
            <RadioGroup className='flex items-center justify-center my-2'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className='cursor-pointer'
                  onChange={changeEventHandler}
                  checked={input.role === 'student'}
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className='cursor-pointer'
                  onChange={changeEventHandler}
                  checked={input.role === 'recruiter'}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Display error message */}
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          {loading ? (
            <Button className='w-full my-4'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
            </Button>
          ) : (
          
          <Button className='w-full my-2' type="submit">Log in</Button>
          )}

            
          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-700 font-bold'>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
