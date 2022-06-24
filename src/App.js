// import React, { Fragment } from 'react';
import './App.css';
import CreateAccount from './components/CreateAccount';
import Button from './components/Button';

// const logUsername = document.querySelector("#username").value
// const logPassword = document.querySelector("#password").value

// const account = {
//   username:{logUsername},
//   password:{logPassword},
//   email:"test@test.com"
// }

const account = {
  username:"john paul",
  password:"password",
  email:"test@test.com"
}


function App() {
  const title = "</penny's bank>"
  return (
    <div className="main-container">
     <div className="login">
        <h1 className="text-5xl font-bold text-red-600">{title}</h1>
        <h3>Log in to PENNY'S BANK</h3>
        <label for="username">Username:
          <input id="username" type="text" placeholder="username" name="username" required
          minlength="4" maxlength="8" size="10"/>
        </label>
        
        <label for="password">Password:
          <input id="password" type="password" placeholder='password' name="password" required
          minlength="4" maxlength="8" size="10"/>
        </label>
        <Button/>
      </div>
      <div className='account'>
        <CreateAccount account = {account} />
      </div>
    </div>
  );
}

export default App;
