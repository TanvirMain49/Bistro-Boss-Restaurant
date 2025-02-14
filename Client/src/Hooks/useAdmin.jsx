import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';

const useAdmin = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();
    const {data:isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`users/admin/${user?.email}`)
            return res.data.admin;
        }
    })
    return {isAdmin, isAdminLoading};
};

export default useAdmin;