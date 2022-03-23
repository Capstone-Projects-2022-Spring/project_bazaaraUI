import React, { useState } from 'react';

import './styles.css';
import { Link, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  }

  console.log('api key is ' + firebaseConfig.apiKey)

  const app = initializeApp(firebaseConfig)

  const handleFormSubmit = (passedUsername, passedPassword) => {

    const auth = getAuth(app)

    createUserWithEmailAndPassword(auth, passedUsername, passedPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Login successful. Current user: ' + user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Login failed. Error message: ' + errorCode + ' ' + errorMessage)
        // ..
      })

    // console.log('Called handleFormSubmit function')
    // console.log('Username: ' + username + ' Password: ' + password)

    // const errors = {
    //   username: 'invalid username',
    //   password: 'invalid password',
    // }

    // const userData = {
    //   username: 'user',
    //   password: 'password',
    // }

    // if (userData) {
    //   if (userData.username !== username) {
    //     setErrorMessages({ name: 'username', message: errors.username })
    //     console.log('Username ' + password + ' does not match ' + userData.username)
    //   } else {
    //     if (userData.password !== password) {
    //       setErrorMessages({ name: 'password', message: errors.password })
    //       console.log('Password ' + password + ' does not match ' + userData.password)
    //     } else {
    //       setIsSubmitted({ status: true, message: 'Logged in successfully!' })
    //     }
    //   }
    // }

    // console.log('Username: ' + username + ' Password: ' + password)
    // if (username === 'user' && password === 'password') {
    //   setFailedToLoginMessage('')
    //   Navigate('/home')
    // } else {
    //   setFailedToLoginMessage('Username or Password is incorrect')
    // }
    // createUserWithEmailAndPassword(auth, username, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log('ERROR during createUserWithEmailAndPassword: ' + errorCode + ' ' + errorMessage);
    //     // ..
    //   });
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderLoggedInMessage = () => (
    true === isSubmitted.status && (
      <div className="loggedIn">{isSubmitted.message}</div>
    )
  )


  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );


  // const Form = props => (
  //   <div>
  //     <FormInput description="Username" placeholder="Enter your username" type="text" onChange={setUsername({ value })} />
  //     <FormInput description="Password" placeholder="Enter your password" type="password" onChange={setPassword({ value })} />
  //     <FormButton title="Log in" />
  //   </div>
  // );

  const LoginButton = props => (
    <div id="button" className="row">
      <button>
        Log in
      </button>
    </div>
  );

  const FormInput = props => (
    <div className="row">
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
    </div>
  );

  // const PasswordForm = props => (
  //   <div className="row">
  //     <label>{props.description}</label>
  //     <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
  //   </div>
  // );

  const RegisterText = props => (
    <div className="switchText">
      Are you new here?
      <Link to="/register">
        Click here to register.
      </Link>
    </div>
  )

  const OtherMethods = props => (
    <div id="alternativeLogin">
      <label>Or sign in with:</label>
      <div id="iconGroup">
        <Facebook />
        <Twitter />
        <Google />
      </div>
    </div>
  );

  const Facebook = props => (
    <a id="facebookIcon"></a>
  );

  const Twitter = props => (
    <a id="twitterIcon"></a>
  );

  const Google = props => (
    <a id="googleIcon"></a>
  );

  const FailedToLoginMessage = props => (
    <div>
      {props.message}
    </div>
  )

  return (
    <section className='login_form'>
      <div id="loginform">
        {renderLoggedInMessage()}
        <FormHeader title="Login" />
        <div className="row">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" onChange={handleUsernameChange} value={username} required />
          {renderErrorMessage('username')}
        </div>
        {/* <FormInput description="Username"
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        /> */}
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={handlePasswordChange} value={password} required />
          {renderErrorMessage('password')}
        </div>
        {/* <FormInput description="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        /> */}
        <div id="button" className="row">
          <button onClick={(username, password) => handleFormSubmit(username, password)}>
            Log in
          </button>
        </div>
        {/* <LoginButton onClick={handleFormSubmit} /> */}
        <RegisterText />
        <OtherMethods />
      </div>
    </section>
  )
}