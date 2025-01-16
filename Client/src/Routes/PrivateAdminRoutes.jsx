import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';

const PrivateAdminRoutes = ({children}) => {
    const {user, loader} = UseAuth();
    const {isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();
    if(loader || isAdminLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children;
    }
    return (
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    );
};

export default PrivateAdminRoutes;