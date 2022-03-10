import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export class LoginForm extends React.Component {
  render() {
    var username;
    var password;

    return (
      <>
        <section className='login_form'>

          <div id="loginform">
            <FormHeader title="Login" />
            <UsernameForm
              description="Username"
              placeholder="Enter your username"
              type="text"
              onChange={username=this.value}
            />
            <PasswordForm description="Password"
              placeholder="Enter your password"
              type="password"
              onChange={password=this.value}
            />
            <LoginButton onClick={handleFormSubmit(username, password)}/>
            <RegisterButton />
            <OtherMethods />
          </div>
        </section>
      </>
    )
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyCvdgBDgUVeVM_RBBskYiBFjdNsRqkN4Bk',
  authDomain: 'bazaara-342116.firebaseapp.com'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const handleFormSubmit = (username, password) => {
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('ERROR during createUserWithEmailAndPassword: ' + errorCode + ' ' + errorMessage);
      // ..
    });
}

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
  <div id="button" class="row">
    <button>
      Log in
    </button>
  </div>
);

const UsernameForm = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
  </div>
);

const PasswordForm = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
  </div>
);

const RegisterButton = props => (
  <div class="switchText">
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