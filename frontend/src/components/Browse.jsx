import React from 'react'
import Navbar from './shared/Navbar';
import Job from './job';

const random=[1,2,9,9,7,9];

function Browse() {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold tetx-md'> Search result ({random.length})</h1>
            <div> 
                <div className=' grid grid-cols-3 gap-4 mt-10'>
                    {
                        random.map((item,index)=>{
                            return (
                                <Job/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Browse