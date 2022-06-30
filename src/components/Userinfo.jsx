function Userinfo(props){
    const {currentBalance} = props
    return(
        <div className="user-info-section">
            <span>{currentBalance}</span>

        </div>
    )
}

export default Userinfo;