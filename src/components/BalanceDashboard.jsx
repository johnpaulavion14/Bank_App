import React, { useState } from 'react'
import AccountSettings from "./AccountSettings";

function BalanceDashboard(props){
    const {currentBalance,setLoginPass,accountName,setOpenModal} = props
    const [accountNameState,setAccountNameState] = useState(accountName)
    const [accountSettingsActive, setAccountSettingsActive] = useState(false)

    return(
        <div className="user-info-section">
            {
            accountSettingsActive?
            <AccountSettings
            setLoginPass = {setLoginPass}
            setAccountSettingsActive = {setAccountSettingsActive}
            setAccountNameState = {setAccountNameState}
            setOpenModal = {setOpenModal}
            />
            :
            <div className='balance-diplay'>
                <h2 id='accountName-display'>Account Name:{accountNameState}</h2>
                <span id='current-money'>&#8369;{currentBalance}</span>
                <button onClick={()=>setAccountSettingsActive(true)} className="addexpense-button">Account Settings</button>
            </div>
            }
        </div>
    )
}

export default BalanceDashboard;