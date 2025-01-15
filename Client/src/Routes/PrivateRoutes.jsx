import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const location = useLocation();
    if(loader){
        return <h1>Loading....</h1>
    }
    if(user){
        return children;
    }
    return (
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoutes;