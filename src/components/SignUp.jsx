import React, { useState } from 'react'

function SignUp(props){
    const {setSignupActive} = props
    const [signupState, setSignupState] = useState({
        username:'',
        password:'',
        accountName:'',
        email:''
      })
      const {username,password,accountName,email} = signupState
      const handleOnSignup = (e) => {
        const { name, value } = e.target
        setSignupState({ ...signupState, [name]: value })
      }
      const userDetails = {
        username:username,
        password:password,
        accountName:accountName,
        email:email,
        currentBalance:0
      }
      const logInAccounts = {
        username:username,
        password:password
      }
    const loginAccountsLocal = JSON.parse(localStorage.getItem('logInAccounts'))?JSON.parse(localStorage.getItem('logInAccounts')):[]
    loginAccountsLocal.push(logInAccounts)

    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))?JSON.parse(localStorage.getItem('userDetails')):[]
   
    const userDetailsUsername = userDetailsLocal.map(element => element.username)
    // const userDetailsPassword = userDetailsLocal.map(element => element.password)
    const userDetailsAccountname = userDetailsLocal.map(element => element.accountName)
    const userDetailsEmail = userDetailsLocal.map(element => element.email)
   
    const finishedSignup = (e) => {
      e.preventDefault()
        userDetailsLocal.push(userDetails)
        localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
        localStorage.setItem('logInAccounts',JSON.stringify(loginAccountsLocal))
        setSignupActive(false)
    }

    let userLastInput=''
    let usernameColor;
    let accountNameColor;
    let emailColor;
    //Username
    userDetailsUsername.forEach(element => {
      if(username === element){
        usernameColor = 'username-color'
      }
    })
    const usernameValue =()=>{
      if(userDetailsUsername.includes(username)){
        return 'Invalid Username!'
      }else{
        if(username === 'Invalid Username'){
        return userLastInput
        }else{
          return username
        }
      }
    }
    //AccountName
    userDetailsAccountname.forEach(element => {
      if(accountName === element){
        accountNameColor = 'accountName-color'
      }
    })
    const accountNameValue =()=>{
      if(userDetailsAccountname.includes(accountName)){
        return 'Invalid Account Name!'
      }else{
        if(accountName === 'Invalid Account Name'){
        return userLastInput
        }else{
          return accountName
        }
      }
    }
    //Email
    userDetailsEmail.forEach(element => {
      if(email === element){
        emailColor = 'email-color'
      }
    })
    const emailValue =()=>{
      if(userDetailsEmail.includes(email)){
        return 'Invalid Email!'
      }else{
        if(email === 'Invalid Email'){
        return userLastInput
        }else{
          return email
        }
      }
    }
    
    return(
        <div className="signup-container">
          <form className='signup-form' onSubmit={finishedSignup}>
            <h1 className="login-logo">-penny's bank-</h1>
            <h3 className="login-title">Sign-Up to PENNY'S BANK</h3>
            <div className="username">
              <label for="username">Username:
              <input id="username" className={usernameColor} type="text" placeholder="username name" name="username" value={usernameValue()} required
              onChange={handleOnSignup} />
              </label>
            </div>
            <div className="password">
              <label for="password">Password:
              <input id="password" type="password" placeholder="password" name="password" value={password} required
              onChange={handleOnSignup} />
              </label>
            </div>
            <div className="accountName">
              <label for="accountName">Account Name:
               <input id="accountName" className={accountNameColor} type="text" placeholder="accountName" name="accountName" value={accountNameValue()} required
              onChange={handleOnSignup} />
              </label>
            </div>
            <div className="email">
              <label for="email">Email:
              <input id="email" className={emailColor} type="email" placeholder="email" name="email" value={emailValue()} required
              onChange={handleOnSignup} />
              </label>
            </div>
            <input type="submit" value="SIGNUP" className="login-button" />
            <button className="login-button" onClick={() => setSignupActive(false)}>go back to Log-in</button>
          </form>
        </div>
    )
}

export default SignUp;