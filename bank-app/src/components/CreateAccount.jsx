const CreateAccount = (props)=>{
    const{username,password,email} = props.account
    
    return(
        <div>
            <div>username: {username}</div>
            <div>password: {password}</div>
            <div>email: {email}</div>
        </div>
    )
}

export default CreateAccount