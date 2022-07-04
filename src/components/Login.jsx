import React, { useState } from 'react'


function Login(props){
    const {setSignupActive,setLoginPass} = props
    const [loginState, setLoginState] = useState({
        username:'',
        password:''
      })
      const {username,password} = loginState
      const handleOnLogin = (e) => {
        const { name, value } = e.target
        setLoginState({ ...loginState, [name]: value })
        setErrorUsername('')
        setErrorPassword('')
      }
      
      const loginAccountsLocal = JSON.parse(localStorage.getItem('logInAccounts'))
      const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))?JSON.parse(localStorage.getItem('userDetails')):[]

      const userDetailsUsername = userDetailsLocal.map(element =>element.username)
      const userDetailsPassword = userDetailsLocal.map(element => element.password)
      
      const clickLogin = (e) => {
        e.preventDefault()
        loginAccountsLocal.forEach((element)=>{
          if(username === element.username && password === element.password){
            localStorage.setItem('currentUser',JSON.stringify(username))
            setLoginPass({loginPass:true,currentUser:username})
          }else{
            if(!userDetailsUsername.includes(username)){
              setErrorUsername('Invalid Username!')
            }
            if(!userDetailsPassword.includes(password)){
              setErrorPassword('Invalid Password!')
            }
          }
        })
      }
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

 
      
    return(
        <div className="login-container">
          <form className="login-form" onSubmit={clickLogin}>
            <h1 className="login-logo">-penny's bank-</h1>
            <h3 className="login-title">Log in to PENNY'S BANK</h3>
            <div className="username">
              <label for="username">Username: 
              <input id="username" type="text" placeholder="username" name="username" value={username} onChange={handleOnLogin} required
              />
              </label>
              <span className='errorLogin'>{errorUsername}</span>
            </div>
            <div className="password">
              <label for="password">Password:
              <input id="password" type="password" placeholder="password" name="password" value={password} onChange={handleOnLogin} required
              />
              </label>
              <span className='errorLogin'>{errorPassword}</span>
            </div>
            <input type="submit" value="LOGIN" className="login-button"/>
            <i className="sign-up">Don't have an account? <a onClick={() => setSignupActive(true)} id='signup-link'>Sign-up</a></i>
          </form>
        </div>
    )
}

export default Login;