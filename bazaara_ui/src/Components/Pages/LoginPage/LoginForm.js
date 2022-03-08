import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

export class LoginForm extends React.Component {
    render(){
    return(
      <>
      <section className='login_form'>

        <div id="loginform">
            <FormHeader title="Login" />
            <Form />
            <RegisterButton />
            <OtherMethods />
        </div>
      </section>
      </>
    )
    }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Username" placeholder="Enter your username" type="text" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormButton title="Log in"/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
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