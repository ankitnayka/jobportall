import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useSelector } from "react-redux"

function LatestJobCards({job}) {
  // const {allJobs}=useSelector(store=>store.job)
  
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job.company.name}</h1>
        <p className='text-sm'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg'>{job.title}</h1>
        <p className='text-sm text-gray-600'>{job.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
          <Badge className={'text-blue-700 font-bold'} variant="ghost" >{job.position}</Badge>
          <Badge className={'text-[#F83002] font-bold'}variant="ghost">{job.salary}</Badge>
          <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.jobType}</Badge>
      </div>
      
    </div>
  )
}

export default LatestJobCards