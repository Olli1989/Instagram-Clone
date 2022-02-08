import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import iphoneWithProfile from '../images/iphone-with-profile.jpg'
import instagramLogo from '../images/logo.png'

export default function Login() {

  const navigate = useNavigate()

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  
  useEffect(() => {
      document.title = 'Login - Instagram';
  }, []);

  async function handleLogin(event){
    event.preventDefault();

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, emailAddress, password)
        const user = userCredential.user
        navigate(ROUTES.DASHBOARD)

    } catch (error){
        setEmailAddress('');
        setPassword('');
        setError(error.message);
    }
  }
  
  return (
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
          <div className="flex w-3/5">
              <img src={iphoneWithProfile} alt="iPhone with Instagram app" />
          </div>
          <div className="flex flex-col w-2/5">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
              <h1 className="flex justify-center w-full">
                  <img src={instagramLogo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
              </h1>
              
              {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

              <form>
                  <input
                      aria-label="Enter your email address"
                      className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                      type="text"
                      placeholder="Email address"
                      value={emailAddress}
                      onChange={({ target }) => setEmailAddress(target.value)}
                  />
                  <input
                      aria-label="Enter your password"
                      className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                  />
                  <button
                      disabled={isInvalid}
                      type="submit"
                      className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${ isInvalid && 'cursor-not-allowed opacity-50'
                      }`}
                      onClick={handleLogin}
                  >
                      Log In
                  </button>
              </form>
          </div>
              <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                  <p className="text-sm">
                      Don't have an account?{' '}
                      <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500 hover:text-blue-300">
                          Sign up
                      </Link>
                  </p>
              </div>
          </div>
      </div>
  )
}