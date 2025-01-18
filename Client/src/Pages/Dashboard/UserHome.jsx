import React from 'react';
import UseAuth from '../../Hooks/UseAuth';

const UserHome = () => {
    const {user} = UseAuth();
    return (
        <div>
            <h1>User Home, welcome {user ? user.displayName: 'back'}</h1>
        </div>
    );
};

export default UserHome;