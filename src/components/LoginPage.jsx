import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';



function LoginPage(){

    const [signupActive, setSignupActive] = useState(false)
    const [loginPass, setLoginPass] = useState(false)

    const clickSignup = () => {
        setSignupActive(true)
    }
    const goToLogin = () => {
        setSignupActive(false)
    }
    const logInPass = () => {
        setLoginPass(true)
    }

   
    return(
        <div>
        {
        loginPass?
        <Dashboard

        />
        :
        <div>
            {
            signupActive?
            <SignUp
            goToLogin = {goToLogin}
            />:
            <Login
            clickSignup = {clickSignup}
            logInPass = {logInPass}

            />
            }
        </div>
        }
        </div>
    )
}

export default LoginPage;