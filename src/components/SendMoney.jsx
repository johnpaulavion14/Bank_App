import React, { useState , useEffect} from 'react'

function SendMoney (props){
    const {computeBalance,transactionHistoryList,setOpenModal} = props
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const [sendMoneyState, setSendMoneyState] = useState({
        sendMoney:'',
        accountName:'',
        sendMoneyActive:false
      })
    const {sendMoney,accountName,sendMoneyActive} = sendMoneyState
      
    let index;
    let sendUserDetails;
    let activateSendMoney = false
    let recipientUsername;
    let disableButton = true
    let opacityValue = {opacity:'50%'}
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    userDetailsLocal.forEach((element,elementIndex)=>{
        if(element.accountName===accountName){
            index=elementIndex
            sendUserDetails=element
            activateSendMoney = true
            recipientUsername = element.username
            disableButton = false
            opacityValue = {opacity:'100%'}
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
        sendUserDetails.currentBalance += Number(sendMoney)
        userDetailsLocal.splice(index,1,sendUserDetails)
        localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
        setSendMoneyState({ ...sendMoneyState, sendMoneyActive: false })
        computeBalance({sendMoney:Number(sendMoney)})
        transactionHistoryList('Send Money',sendMoney,accountName,recipientUsername)
        setOpenModal({openModal:true,actionName:'SEND MONEY'})

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
              <form className='sendMoney-form' onSubmit={clickSendMoneyProceed}>
                <label for="accountName">AccountName:
                <input id="accountName" type="text" placeholder="account name" name="accountName" value={accountName} 
                minlength="4" maxlength="12" size="12" onChange={onAccountNameChange}/>
                </label>

                <label id='sendMoney-label' for="sendMoney">Send Money:
                <input id="sendMoney" type="number" placeholder="send money" name="sendMoney" value={sendMoney} 
                minlength="4" maxlength="8" size="10" onChange={onSendMoneyChange} required/>
                </label>
               
                <div className='logout'>
                <input type="submit" value="Proceed" className="update-button" disabled={disableButton} style={opacityValue}/>
                <button className="update-button" onClick={() => clickCancelSendMoney()}>Cancel</button>
                </div>
              </form>
            </div>
            :
            <button className="sendMoney" onClick={() => clickSendMoney()}>SendMoney</button>
        }
        </section>
    )
}

export default SendMoney;