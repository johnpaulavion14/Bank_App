import React, { useState , useEffect} from 'react'

function SignUp(props){
    const {goToLogin} = props
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
    const userDetailsPassword = userDetailsLocal.map(element => element.password)
    const userDetailsAccountname = userDetailsLocal.map(element => element.accountName)
    const userDetailsEmail = userDetailsLocal.map(element => element.email)
   
    if(username !== '' && userDetailsUsername.includes(username)){
      alert("Username is already taken")
    }
    if(password !== '' && userDetailsPassword.includes(password)){
      alert("Password is already taken")
    }
    if(accountName !== '' && userDetailsAccountname.includes(accountName)){
      alert("Account name is already taken")
    }
    if(email !== '' && userDetailsEmail.includes(email)){
      alert("Email is already taken")
    }
    const finishedSignup = (e) => {
      e.preventDefault()
        userDetailsLocal.push(userDetails)
        localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
        localStorage.setItem('logInAccounts',JSON.stringify(loginAccountsLocal))
        goToLogin()
    }
    const cancelSignup = ()=>{
      goToLogin()
    }

    return(
        <div className="signup-container">
          <form onSubmit={finishedSignup}>
            <h1 className="login-logo">-penny's bank-</h1>
            <h3 className="login-title">Sign-Up to PENNY'S BANK</h3>
            <div className="username">
            <label for="username">Username:</label>
            <input id="username" type="text" placeholder="username name" name="username" value={username} required
             onChange={handleOnSignup} />
            </div>
            <div className="password">
            <label for="password">Password:</label>
            <input id="password" type="password" placeholder="password" name="password" value={password} required
             onChange={handleOnSignup} />
            </div>
            <div className="accountName">
            <label for="accountName">Account Name:</label>
            <input id="accountName" type="text" placeholder="accountName" name="accountName" value={accountName} required
             onChange={handleOnSignup} />
            </div>
            <div className="email">
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="email" name="email" value={email} required
             onChange={handleOnSignup} />
            </div>
            <input type="submit" value="SIGNUP" className="login-button" />
            </form>
            <button className="login-button" onClick={() => cancelSignup()}>go back to Log-in</button>
        </div>
    )
}

export default SignUp;