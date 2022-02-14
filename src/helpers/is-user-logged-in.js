import React from 'react';
import { Navigate } from 'react-router-dom';

export default function IsUserLoggedIn({ user, loggedInPath, children}) {

    if(!user){
        return children;
    } else if (user) {
        return <Navigate to={loggedInPath} replace/>
    } else return null
}