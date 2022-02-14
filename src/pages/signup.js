import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

import FirebaseContext  from "../context/FirebaseContext"
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from "../services/firebaseServices"

import instagramLogo from '../images/logo.png'

export default function SignUp() {

  const navigate = useNavigate()
  const { db } = useContext(FirebaseContext)

  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const isInvalid = userName === '' || fullName === '' || password === '' || emailAddress === '';
  
  useEffect(() => {
      document.title = 'Sign up - Instagram';
  }, []);

  async function handleSignup(event){
    event.preventDefault();

    const usernameExist = await doesUsernameExist(userName)

    if(usernameExist && usernameExist.length === 0){
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, password)
        const user = userCredential.user

        await updateProfile(auth.currentUser, {
          displayName: userName
        })

        await addDoc(collection(db, "users"),{
          userId: user.uid,
          username: userName.toLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        })
        
        navigate(ROUTES.LOGIN)
          
      } catch (error){
        setFullName('')
        setError(error.message)
      }
    } else {
      setUserName('')
      setFullName('')
      setEmailAddress('')
      setPassword('')
      setError('That username is already taken, please try another!')
    }

    
  }
  
  return (
      <div className="container flex mx-auto max-w-xs items-center h-screen">
          <div className="flex flex-col">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
              <h1 className="flex justify-center w-full">
                  <img src={instagramLogo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
              </h1>
              
              {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

              <form onSubmit={handleSignup} method="POST">
                  <input
                      aria-label="Enter your name"
                      className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={({ target }) => setUserName(target.value.toLowerCase())}
                  />
                  <input
                      aria-label="Enter your Full name"
                      className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                      type="text"
                      placeholder="Full name"
                      value={fullName}
                      onChange={({ target }) => setFullName(target.value)}
                  />
                  <input
                      aria-label="Enter your email address"
                      className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                      type="text"
                      placeholder="Email address"
                      value={emailAddress}
                      onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
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
                      className={`bg-blue-500 text-white w-full rounded h-8 font-bold 
                      ${ isInvalid && 'cursor-not-allowed opacity-50'}`}
                      onClick={handleSignup}
                  >
                      Sign up
                  </button>
              </form>
          </div>
              <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                  <p className="text-sm">
                      Have an account?{' '}
                      <Link to={ROUTES.LOGIN} className="font-bold text-blue-500 hover:text-blue-300">
                          Sign in
                      </Link>
                  </p>
              </div>
          </div>
      </div>
  )
}