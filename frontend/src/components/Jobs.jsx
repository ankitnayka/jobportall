import React from 'react'
import Navbar from './shared/Navbar'
import FilterJob from './FilterJob'
import Job from './Job'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useSelector } from 'react-redux'

// const jobsArray = [1, 2, 3, 4, 5, 6, 7]


function Jobs() {
  
  const {allJobs}=useSelector(store=>store.job)
  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-25'>
        <div className='flex gap-5'>
          <div className='w-20%'>

            {/* filter page */}
            <FilterJob/>
          </div>

          {/* single job card */}
          {
              allJobs.length <= 0 ? <span>Job not found</span> :(
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                  <div className='grid grid-cols-3 gap-4'>
                  {
                    allJobs.map((job)=>(
                      <Job job={job} key={job._id}  />
                    ))
                  }
                  </div>

                </div>
              )
          }
        </div>



      </div>

    </div>
  )
}

export default Jobs