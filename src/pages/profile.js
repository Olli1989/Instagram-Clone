import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import UserProfile from '../components/profile';
import { getUserByUsername } from '../services/firebaseServices';
import * as ROUTES from '../constants/routes';

export default function Profile() {
    const { username } = useParams();
    const [userExists, setUserExists] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserExistsToLoadProfile() {
            const doesUserExist = await getUserByUsername(username);
            if (!doesUserExist) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                setUserExists(true);
            }
        }
        checkUserExistsToLoadProfile();
    }, [username, navigate])
    
    return userExists ? (
        <div className="bg-gray">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile username={username} />
            </div>
        </div>
    ) : null;
}