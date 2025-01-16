import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateAdminRoutes = ({children}) => {
    const {user, loader} = UseAuth();
    const {isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();
    if(loader || isAdminLoading){
        return <h1>Loading....</h1>
    }
    if(user && isAdmin){
        return children;
    }
    return (
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    );
};

export default PrivateAdminRoutes;