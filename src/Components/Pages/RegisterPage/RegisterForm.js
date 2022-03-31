import React, { useState } from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

export function RegisterForm({ handleRegister, emailErrorMessage, passwordErrorMessage, verifyPasswordErrorMessage }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    function handleRegisterSubmit() {
        handleRegister(email, password, verifyPassword)
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleVerifyPasswordChange = event => {
        setVerifyPassword(event.target.value)
    }

    return (
        <section className='bg-purple-400 p-6'>
            <div id="registerform">
                <FormHeader title="Register" />
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

                <div className="row">
                    <label>Verify Password</label>
                    <input type="password" placeholder="Re-enter your password" onChange={handleVerifyPasswordChange} value={verifyPassword} required />
                    {verifyPasswordErrorMessage}
                </div>

                <div id="button" className="flex justify-center items-center my-4">
                    <button className="bg-purple-500 px-2 py-1 text-white rounded-full w-48 text-white" onClick={() => handleRegisterSubmit()}>
                        Register
                    </button>
                </div>

                <LoginText />
            </div>
        </section>
    )
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

const LoginText = props => (
    <div className="switchText text-center text-gray-500">
        Already have an account?
        <Link to="/">
            Click here to log in.
        </Link>
    </div>
)