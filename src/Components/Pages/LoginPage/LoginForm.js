import React, { useState } from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

export function LoginForm({ handleLogin, emailErrorMessage, passwordErrorMessage, handleGoogleAuth, handleTwitterAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLoginSubmit() {
    handleLogin(email, password)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );

  const RegisterText = props => (
    <div className="switchText text-center text-gray-500">
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
        <Twitter />&nbsp;&nbsp;
        <Google />&nbsp;&nbsp;
      </div>
    </div>
  );

  const Twitter = props => (
    <button id="twitterIcon" onClick={handleTwitterAuth} />
  );

  const Google = props => (
    <button id="googleIcon" onClick={handleGoogleAuth} />
    
  );

  return (
    <section className='bg-purple-400 p-6 '>
      <div id="loginform">
        <FormHeader title="Login" />
        <div className="row">
          <label>Email</label>
          <input type="text" placeholder="Enter your email" onChange={handleEmailChange} value={email} required />
          {emailErrorMessage}
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={handlePasswordChange} value={password} required />
          {passwordErrorMessage}
        </div>
        <div id="button" className=" flex justify-center items-center my-4   ">
          <button className="bg-purple-500 px-2 py-1  text-white rounded-full w-48 text-white" onClick={() => handleLoginSubmit()}>
            Log in
          </button>
        </div>
        <RegisterText />
        <OtherMethods />
      </div>
    </section>
  )
}
