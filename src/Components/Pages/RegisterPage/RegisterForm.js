import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

export class RegisterForm extends React.Component {
    render(){
    return(
        <>
        <section className='bg-purple-400 p-6'>
        <div id="registerform">
            <FormHeader title="Register" />
            <Form />
            <LoginButton />
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
    <FormInput description="Email" placeholder="Enter your email" type="email" />
    <FormInput description="Password" placeholder="Enter your password" type="password"/>
    <FormInput description="Verify password" placeholder="Re-enter your password" type="password"/>
    <FormButton title="Register"/>
    </div>
);

const FormButton = props => (
<div id="button" className="flex justify-center items-center my-4">
    <button className="bg-purple-500 px-2 py-1 text-white rounded-full w-48 text-white">{props.title}</button>
</div>
);

const FormInput = props => (
<div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
</div>  
);

const LoginButton = props => (
    <div className="switchText text-center text-gray-500">
        Already have an account?
        <Link to="/">
            Click here to log in.
        </Link>
    </div>
)