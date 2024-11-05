import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function useGetAllJobs() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/jobs/getalljobs",{withCredentials:true});
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    toast.success('Jobs fetched successfully!');
                } else {
                    toast.error('Failed to fetch jobs.');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                toast.error('Error fetching jobs.');
            }
        };
        
        fetchAllJobs();
    }, [dispatch]); // Adding dispatch to the dependency array
}

export default useGetAllJobs;
