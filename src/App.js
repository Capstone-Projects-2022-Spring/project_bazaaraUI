import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyles";
import theme from "./themes/themes";
import Button from "./Components/Button";
import './App.css';
import { LoginForm } from './Components/Pages/LoginPage/LoginForm';
import { RegisterForm } from './Components/Pages/RegisterPage/RegisterForm';
import HomeForm from './Components/Pages/HomePage/HomeForm';
import Navbar from './Components/NavBar/Navbar';
import { ProductSearch } from './Components/Pages/ProductSearch/ProductSearch';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function App() {
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [verifyPasswordErrorMessage, setVerifyPasswordErrorMessage] = useState('')

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
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
            break;
          case 'auth/wrong-password':
            setPasswordErrorMessage('Invalid password')
            break;
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Login failed. Error message: ' + errorCode + ' ' + errorMessage)
        // ..
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
        // Signed in
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
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Login failed. Error message: ' + errorCode + ' ' + errorMessage)
        // ..
      })
  }

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
      <Navbar handleSignout={handleSignout}/>
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
        <Route path="/search" element={<ProductSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
