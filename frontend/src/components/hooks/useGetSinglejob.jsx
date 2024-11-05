import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function useGetSingleJob({jobId}) {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/jobs/getjob/${jobId}`,{withCredentials:true});
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.jobs));
                    toast.success('Jobs fetched successfully!');
                } else {
                    toast.error('Failed to fetch jobs.');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                toast.error('Error fetching jobs.');
            }
        };
        
        fetchSingleJob();
    }, [dispatch]); // Adding dispatch to the dependency array
}

export default useGetSingleJob;
