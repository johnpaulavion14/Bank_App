import React, { useState } from 'react'

function AccountSettings (props){
    const {setLoginPass,setAccountSettingsActive,setAccountNameState,setOpenModal} = props
    let index;
    let currentUserDetails;
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUserExpenses = JSON.parse(localStorage.getItem(`${currentUser}Expenses`))
    const currentUserTransactions = JSON.parse(localStorage.getItem(`${currentUser}Transactions`))
    userDetailsLocal.forEach((element,elementIndex)=>{
        if(element.username===currentUser){
            index=elementIndex
            currentUserDetails=element
        }
        })

    const [editAccountState, setEditAccount] = useState({
        username:currentUserDetails.username,
        password:currentUserDetails.password,
        accountName:currentUserDetails.accountName,
        email:currentUserDetails.email
      })
    
      const {username,password,accountName,email} = editAccountState
      const onEditAccountChange = (e) => {
        const { name, value } = e.target
        setEditAccount({ ...editAccountState, [name]: value })
      }
      const newUserDetails = {
        username:username,
        password:password,
        accountName:accountName,
        email:email,
        currentBalance:currentUserDetails.currentBalance
      }
      const newLogInAccounts = {
        username:username,
        password:password
      }
    const loginAccountsLocal = JSON.parse(localStorage.getItem('logInAccounts'))?JSON.parse(localStorage.getItem('logInAccounts')):[]

   
    const userDetailsUsername = userDetailsLocal.map(element => element.username)
    // const userDetailsPassword = userDetailsLocal.map(element => element.password)
    const userDetailsAccountname = userDetailsLocal.map(element => element.accountName)
    const userDetailsEmail = userDetailsLocal.map(element => element.email)
   
    let userLastInput=''
    let usernameColor;
    let accountNameColor;
    let emailColor;
    //Username
    userDetailsUsername.forEach(element => {
      if(username === element && username !== currentUserDetails.username){
        usernameColor = 'username-color'
      }
    })
    const usernameValue =()=>{
    if(username !== currentUserDetails.username && userDetailsUsername.includes(username)){
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
      if(accountName === element && accountName !== currentUserDetails.accountName){
        accountNameColor = 'accountName-color'
      }
    })
    const accountNameValue =()=>{
      if(accountName !== currentUserDetails.accountName && userDetailsAccountname.includes(accountName)){
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
      if(email === element && email !== currentUserDetails.email){
        emailColor = 'email-color'
      }
    })
    const emailValue =()=>{
      if(email !== currentUserDetails.email && userDetailsEmail.includes(email)){
        return 'Invalid Email!'
      }else{
        if(email === 'Invalid Email'){
        return userLastInput
        }else{
          return email
        }
      }
    }
    
    const finishedEditAccount = (e) => {
      e.preventDefault()
        localStorage.removeItem(`${currentUser}Expenses`)
        localStorage.setItem(`${username}Expenses`,JSON.stringify(currentUserExpenses))
        localStorage.removeItem(`${currentUser}Transactions`)
        localStorage.setItem(`${username}Transactions`,JSON.stringify(currentUserTransactions))

        userDetailsLocal.splice(index,1,newUserDetails)
        loginAccountsLocal.splice(index,1,newLogInAccounts)
        localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
        localStorage.setItem('logInAccounts',JSON.stringify(loginAccountsLocal))
        localStorage.setItem('currentUser',JSON.stringify(username))
        setAccountNameState(accountName)

        setOpenModal({openModal:true,actionName:'UPDATE ACCOUNT'})
    }
    
    const logOut = ()=>{
      localStorage.setItem('currentUser',JSON.stringify(''))
      setLoginPass({
        loginPass:false,
        currentUser:''
      })
    }
    
    return(
        <div className="account-container">
          <form className='updateAccount-form' onSubmit={finishedEditAccount}>
            <h3 className="updateAccount-title">Account Details</h3>
            <div className="update-username">
              <label for="username">Username:
              <input id="username" className={usernameColor} type="text" placeholder="username name" name="username" value={usernameValue()} required
              onChange={onEditAccountChange} />
              </label>
            </div>
            <div className="update-password">
              <label for="password">Password:
              <input id="password" type="password" placeholder="password" name="password" value={password} required
              onChange={onEditAccountChange} />
              </label>
            </div>
            <div className="update-accountName">
              <label for="accountName">Account Name:
              <input id="accountName" className={accountNameColor} type="text" placeholder="accountName" name="accountName" value={accountNameValue()} required
              onChange={onEditAccountChange} />
              </label>
            </div>
            <div className="update-email">
              <label for="email">Email:
              <input id="email" className={emailColor} type="email" placeholder="email" name="email" value={emailValue()} required
              onChange={onEditAccountChange} />
              </label>
            </div>
            <input type="submit" value="Update Account" className="update-button" />
            <div id='logout'>
              <button className="update-button" onClick={()=>setAccountSettingsActive(false)}>go back</button>
              <button className="update-button" onClick={() => logOut()}>Log Out</button>
            </div>
            </form>
        </div>
    )
}

export default AccountSettings;