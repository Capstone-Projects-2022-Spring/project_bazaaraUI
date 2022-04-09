import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './Components/Pages/LoginPage/LoginForm';
import { RegisterForm } from './Components/Pages/RegisterPage/RegisterForm';
import HomeForm from './Components/Pages/HomePage/HomeForm';
import ShoppingListView from './Components/Pages/ShoppingLists/ShoppingListView';
import ErrorPage from "./Components/Pages/404Page/ErrorPage"
import Report from './Components/Pages/Report';
import Logout from './Components/Pages/Logout/logout';
import APIUtil from './APIUtil';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import axios from 'axios';

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
        />} />
        <Route path="/register" element={<RegisterForm
          handleRegister={handleRegister}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          verifyPasswordErrorMessage={verifyPasswordErrorMessage}
        />} />
        <Route path="/home" element={<HomeForm />} />
        {/* very messy but ProductSearch is now a child of ShoppingListView so they can access the same list state variable*/}
        <Route path="/lists" element={<ShoppingListView pageIndex={1} auth={auth} />} />
        <Route path="/search" element={<ShoppingListView pageIndex={0} />} />
        <Route path="/report" element={<Report />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}