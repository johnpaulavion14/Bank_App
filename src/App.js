import './App.css';
import React, {useState} from 'react'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
    const [signupActive, setSignupActive] = useState(false)
    const [loginPassState, setLoginPass] = useState({
        loginPass:false,
        currentUser:JSON.parse(localStorage.getItem('currentUser'))?JSON.parse(localStorage.getItem('currentUser')):''
    })
    const {loginPass,currentUser} = loginPassState

    return(
        <div className='outer-container'>
        {
        loginPass || Boolean(currentUser)?
        <Dashboard
        setLoginPass = {setLoginPass}

        />
        :
        <div className='main-container'>
            {
            signupActive?
            <SignUp
            setSignupActive = {setSignupActive}
            />:
            <Login
            setSignupActive = {setSignupActive}
            setLoginPass = {setLoginPass}
            />
            }
        </div>
        }
        </div>
    )
}

export default App;
