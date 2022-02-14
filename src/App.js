import React, { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/UserContext';

import IsUserLoggedIn from './helpers/is-user-logged-in';
import ProtectedRoute from './helpers/protected-route';

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const NotFound = lazy(() => import ('./pages/not-found'));

export default function App() {
  
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>

            <Route path={ROUTES.LOGIN} element={
              <IsUserLoggedIn
                user={user} 
                loggedInPath={ROUTES.DASHBOARD}
              >
                <Login/>
              </IsUserLoggedIn>
            } />

            <Route path={ROUTES.SIGN_UP} element={
              <IsUserLoggedIn
                user={user} 
                loggedInPath={ROUTES.DASHBOARD}
              >
                <SignUp/>
              </IsUserLoggedIn>
            } />

            <Route path={ROUTES.PROFILE} element={<Profile />} />

            <Route path={ROUTES.DASHBOARD} element={
              <ProtectedRoute 
                user={user}
                path={ROUTES.DASHBOARD}
              >
                <Dashboard />
              </ProtectedRoute>

            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
    
  )
}