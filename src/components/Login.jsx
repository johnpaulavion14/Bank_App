import React, { useState , useEffect} from 'react'

function Login(props){
    const {clickSignup,logInPass} = props
    const [loginState, setLoginState] = useState({
        username:'',
        password:''
      })
      const {username,password} = loginState
      const handleOnLogin = (e) => {
        const { name, value } = e.target
        setLoginState({ ...loginState, [name]: value })
      }
      
      const loginAccountsLocal = JSON.parse(localStorage.getItem('logInAccounts'))
      const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))?JSON.parse(localStorage.getItem('userDetails')):[]

      const userDetailsUsername = userDetailsLocal.map(element =>element.username)
      const userDetailsPassword = userDetailsLocal.map(element => element.password)
      
      const clickLogin = (e) => {
        e.preventDefault()
        loginAccountsLocal.forEach((element)=>{
          if(username === element.username && password === element.password){
            logInPass()
            localStorage.setItem('currentUser',JSON.stringify(username))
          }else{
            if(!userDetailsUsername.includes(username)){
              alert("Invalid Username")
            }
            if(!userDetailsPassword.includes(password)){
              alert("Invalid Password")
            }
          }
        })
      }

    return(
        <div className="login-container">
          <form onSubmit={clickLogin}>
            <h1 className="login-logo">-penny's bank-</h1>
            <h3 className="login-title">Log in to PENNY'S BANK</h3>
            <div className="username">
            <label for="username">Username:</label>
            <input id="username" type="text" placeholder="username name" name="username" value={username} onChange={handleOnLogin} required
            />
            </div>
            <div className="password">
            <label for="password">Password:</label>
            <input id="password" type="password" placeholder="password" name="password" value={password} onChange={handleOnLogin} required
            />
            </div>
            <input type="submit" value="LOGIN" className="login-button" />
            <i className="sign-up">Don't have an account? <a onClick={() => clickSignup()}>Sign-up</a></i>
            </form>
        </div>
    )
}

export default Login;