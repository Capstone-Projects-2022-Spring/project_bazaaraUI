import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './Components/Pages/LoginPage/LoginForm';
import { RegisterForm } from './Components/Pages/RegisterPage/RegisterForm';
import HomeForm from './Components/Pages/HomePage/HomeForm';
import ShoppingListView from './Components/Pages/ShoppingLists/ShoppingListView';
import ErrorPage from "./Components/Pages/404Page/ErrorPage"
import Report from './Components/Pages/Report';
import Logout from './Components/Pages/Logout/logout';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

export default function App() {
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [verifyPasswordErrorMessage, setVerifyPasswordErrorMessage] = useState('')

  const firebaseConfig = {
    apiKey: "AIzaSyCvdgBDgUVeVM_RBBskYiBFjdNsRqkN4Bk",
    authDomain: "bazaara-342116.firebaseapp.com",
    projectId: "bazaara-342116",
    storageBucket: "bazaara-342116.appspot.com",
    messagingSenderId: "295000681294",
    appId: "1:295000681294:web:cafb5ab1b4d58a7102cc1f",
    measurementId: "G-Y4R8SLW0KB",
  }

  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)

  // social authentication
  const provider = new GoogleAuthProvider();
  const provider2 = new TwitterAuthProvider();

  function handleGoogleAuth() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.assign('/home') // redirects user to homepage after signing in with google
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  function handleTwitterAuth() {
    signInWithPopup(auth, provider2)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        // The signed-in user info.
        const user = result.user;
        window.location.assign('/home') // redirects user to homepage after signing in with twitter
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
      });
  }


  // Re-direct the user to the login screen if they are not logged in yet
  // useEffect(() => {
  //   if (!auth.user) window.location.replace('.')
  // }, [])

  function handleLogin(email, password) {
    setEmailErrorMessage('')
    setPasswordErrorMessage('')

    if (email.length === 0) { 
      setEmailErrorMessage('Please enter your email')
      return false
    }

    if (password.length === 0) {
      setPasswordErrorMessage('Please enter your password')
      return false
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Login successful. Current user: ' + userCredential.user)
        window.location.assign('/home')
      
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setEmailErrorMessage('Invalid email')
            break
          case 'auth/wrong-password':
            setPasswordErrorMessage('Invalid password')
            break
          case 'auth/user-not-found':
            setEmailErrorMessage('User not found')
            break
          default: setEmailErrorMessage(error.code + ' ' + error.message)
        }
        console.log('Login failed. Error message: ' + error.code + ' ' + error.message)
        return false
      })
      return true
  }

  function handleRegister(email, password, verifyPassword) {
    setEmailErrorMessage('')
    setPasswordErrorMessage('')
    setVerifyPasswordErrorMessage('')

    
    if (email.length === 0) { 
      setEmailErrorMessage('Please enter your email')
      return false
    }

    if (password.length === 0) {
      setPasswordErrorMessage('Please enter your password')
      return false
    }

    if (verifyPassword.length === 0) {
      setVerifyPasswordErrorMessage('Please re-enter your password')
      return false
    }

    if (password !== verifyPassword) {
      setVerifyPasswordErrorMessage('Passwords should match')
      return false
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registered and signed in
        console.log('Register successful. Current user: ' + userCredential.user)
        window.location.assign('/home')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setEmailErrorMessage('Invalid email')
            break
          case 'auth/weak-password':
            setPasswordErrorMessage('Password should be at least 6 characters')
            break
          case 'auth/email-already-in-use':
            setEmailErrorMessage('Email already in use. Do you already have an account?')
            break
          default: setEmailErrorMessage(error.code + ' ' + error.message)
        }
        console.log('Registration failed. Error message: ' + error.code + ' ' + error.message)
      })
  }

  // TODO: This has to get implemented into the Navbar
  function handleSignout() {
    signOut(auth).then(() => {
      // Sign-out successful
      console.log('Successfully signed out')
    }).catch((error) => {
      // An error happened
      console.log('Failed to signout. Error: ' + error)
    })
  }

  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        <Route index element={<LoginForm
          handleLogin={handleLogin}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          auth={auth}
          handleGoogleAuth={handleGoogleAuth}
          handleTwitterAuth={handleTwitterAuth}
        />} />
        <Route path="/register" element={<RegisterForm
          handleRegister={handleRegister}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          verifyPasswordErrorMessage={verifyPasswordErrorMessage}
        />} />
        <Route path="/home" element={<HomeForm auth={auth} />} />
        {/* very messy but ProductSearch is now a child of ShoppingListView so they can access the same list state variable*/}
        <Route path="/lists" element={<ShoppingListView pageIndex={1} auth={auth} />} />
        <Route path="/search" element={<ShoppingListView pageIndex={0} auth={auth} />} />
        <Route path="/report" element={<Report />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}