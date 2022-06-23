const Button = () => {
  function renderAccount(){
    const account = document.querySelector(".account")
    const login = document.querySelector(".login")
    login.style.display = "none"
    account.style.display = "initial"
  }
  return (
    <button onClick={renderAccount}>Log In</button>
  )
}

export default Button
