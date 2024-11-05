import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/jobSlice';

function JobDescription() {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(app => app.userId === user?._id); 
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/application/applyjob/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success("Applied successfully!");
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error applying for the job");
            alert(error.response?.data?.message || "Error applying for the job");
        
        }
    };

    useEffect(() => { 
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/jobs/getjob/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application =>application.applicant == user._id));
                    toast.success('Job fetched successfully!');
                    alert("ok done")
                } else {
                    toast.error('Failed to fetch job.');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                toast.error('Error fetching job.');
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) {
        return <div>Loading job details...</div>;
    }

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob.position}</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob.salary}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob.jobType}</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    onClick={!isApplied ? applyJobHandler : null}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#6e5380]'}`}>
                    {isApplied ? 'Already applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>Job Description</h1>
            <div className='my-5'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
                <h1 className='font-bold my-1'>Total Applications: <span className='pl-4 font-normal text-gray-800'>{singleJob.applications.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{new Date(singleJob.createdAt).toLocaleDateString()}</span></h1>
            </div>
        </div>
    );
}

export default JobDescription;
