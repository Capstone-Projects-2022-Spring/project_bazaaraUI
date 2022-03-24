import React, { useState } from 'react';

import './styles.css';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm({ handleLogin, usernameErrorMessage, passwordErrorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate

  function handleLoginSubmit() {
    handleLogin(username, password)
    navigate("/home")
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );

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

  return (
      <section className='login_form'>
        <div id="loginform">
          <FormHeader title="Login" />
          <div className="row">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" onChange={handleUsernameChange} value={username} required />
            {usernameErrorMessage}
          </div>

          <div className="row">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={handlePasswordChange} value={password} required />
            {passwordErrorMessage}
          </div>

          <div id="button" className="row">
            <button onClick={() => handleLoginSubmit(username, password)}>
              Log in
            </button>
          </div>

          <RegisterText />
          <OtherMethods />
        </div>
      </section>
  )
}