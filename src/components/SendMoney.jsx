import React, { useState , useEffect} from 'react'

function SendMoney (props){
    const {computeBalance} = props
    const [sendMoneyState, setSendMoneyState] = useState({
        sendMoney:'',
        accountName:'',
        sendMoneyActive:false
      })
    // const [activateSendMoney, setActivateSendMoney] = useState(false)
    const {sendMoney,accountName,sendMoneyActive} = sendMoneyState
      
    let index;
    let sendUserDetails;
    let activateSendMoney = false
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    userDetailsLocal.forEach((element,elementIndex)=>{
        if(element.accountName===accountName){
            index=elementIndex
            sendUserDetails=element
            activateSendMoney = true
            alert("Account Name Exist, you can now click send money")
            }
        
        })
   

    
  
    const onSendMoneyChange = (e) => {
      const { name, value } = e.target
      setSendMoneyState({ ...sendMoneyState, [name]: value })
    }
    const onAccountNameChange = (e) => {
      const { name, value } = e.target
      setSendMoneyState({ ...sendMoneyState, [name]: value })
    }
  
    const clickSendMoney = () => {
      setSendMoneyState({ sendMoney:'', sendMoneyActive: true })
    }
    const clickSendMoneyProceed = () => {
        
    if(activateSendMoney){
        alert('hello')
        sendUserDetails.currentBalance += Number(sendMoney)
        userDetailsLocal.splice(index,1,sendUserDetails)
        localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
        console.log(sendUserDetails)
        console.log(userDetailsLocal)
        setSendMoneyState({ ...sendMoneyState, sendMoneyActive: false })
        computeBalance({sendMoney:Number(sendMoney)})
    }else{
    alert("Account Name doesn't exist")
    }

        
        
    }

    const clickCancelSendMoney = () => {
      setSendMoneyState({ ...sendMoneyState, sendMoneyActive: false })
    }
    
    return(
        <section className="sendMoney-section">
        {
            sendMoneyActive?
            <div>
                <label for="sendMoney">Send Money:</label>
                <label for="accountName">AccountName:</label>
                <input id="accountName" type="text" placeholder="account name" name="accountName" value={accountName} 
                minlength="4" maxlength="8" size="10" onChange={onAccountNameChange}/>
                <input id="sendMoney" type="number" placeholder="send money" name="sendMoney" value={sendMoney} 
                minlength="4" maxlength="8" size="10" onChange={onSendMoneyChange}/>
                <button className="proceed" onClick={() => clickSendMoneyProceed()}>Proceed</button>
                <button className="cancelDeposit" onClick={() => clickCancelSendMoney()}>Cancel</button>
            </div>
            :
            <button className="sendMoney" onClick={() => clickSendMoney()}>SendMoney</button>
        }
        </section>
    )
}

export default SendMoney;