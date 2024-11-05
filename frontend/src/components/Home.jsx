import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousal from './CategoryCarousal'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs()
  const navigate=useNavigate()
  const {user}=useSelector(store=>store.auth);
  useEffect(()=>{
      if(user?.role==='recruiter'){
        navigate("/admin/companies")
      }
  },[]) 
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousal/>
    <LatestJob/>
    <Footer/>
    </>
  )
}

export default Home