import React, { useState } from 'react';
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
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

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

  function handleLogin(username, password) {
    setUsernameErrorMessage('')
    setPasswordErrorMessage('')

    if (username.length === 0) { 
      setUsernameErrorMessage('Please enter your email')
      return false
    }

    if (password.length === 0) {
      setPasswordErrorMessage('Please enter your password')
      return false
    }

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        console.log('Login successful. Current user: ' + userCredential.user)
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setUsernameErrorMessage('Invalid email')
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

  function handleRegister(username, password) {

    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        console.log('Login successful. Current user: ' + userCredential.user)
        // ...
      })
      .catch((error) => {
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
          usernameErrorMessage={usernameErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          auth={auth}
        />} />
        <Route path="/register" element={<RegisterForm
          handleRegister={handleRegister}
        />} />
        <Route path="/home" element={<HomeForm />} />
        <Route path="/search" element={<ProductSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
