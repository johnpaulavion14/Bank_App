import React, { useState } from 'react'
import DepositFeature from './DepositFeature';
import WithdrawFeature from './WithdrawFeature';
import TransactionHistory from './TransactionHistory';
import SendMoney from './SendMoney';

function Features(props){
  const {computeBalance,setOpenModal} = props
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
  const transactionHistory =  JSON.parse(localStorage.getItem(`${currentUser}Transactions`))?JSON.parse(localStorage.getItem(`${currentUser}Transactions`)):[]
  const currentAccountName = userDetailsLocal.find(element => element.username === currentUser).accountName
  const [historyState, setHistoryState] = useState(false)
  const getTime =()=>{
    let today = new Date();
    let date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    let time = today.getHours()>12?`${today.getHours()%12}:${today.getMinutes()}:${today.getSeconds()}pm`:`${today.getHours()%12}:${today.getMinutes()}:${today.getSeconds()}am`
    let dateTime = time+' '+date
    return(dateTime)
  }
  const transactionHistoryList =(action,amount,recipient,recipientUsername)=>{
    
    const historyList = {}
    historyList.action = action
    historyList.amount = amount
    historyList.sender = currentAccountName
    historyList.recipient = recipient
    historyList.date = getTime()
    transactionHistory.push(historyList)

    if(recipientUsername === ''){
      localStorage.setItem(`${currentUser}Transactions`,JSON.stringify(transactionHistory))
    }else{
      const recipientTransactions =  JSON.parse(localStorage.getItem(`${recipientUsername}Transactions`))?JSON.parse(localStorage.getItem(`${recipientUsername}Transactions`)):[]
      recipientTransactions.push(historyList)
      localStorage.setItem(`${currentUser}Transactions`,JSON.stringify(transactionHistory))
      localStorage.setItem(`${recipientUsername}Transactions`,JSON.stringify(recipientTransactions))
    }

    
  }

  return(
      <div className='features-mainContainer'>
      {
      historyState?
        <TransactionHistory
          setHistoryState = {setHistoryState}
          />
          :
        <div className="features-section">
          <DepositFeature
          computeBalance = {computeBalance}
          currentAccountName = {currentAccountName}
          transactionHistoryList = {transactionHistoryList}
          setOpenModal = {setOpenModal}
          />
          <WithdrawFeature
          computeBalance = {computeBalance}
          currentAccountName = {currentAccountName}
          transactionHistoryList = {transactionHistoryList}
          setOpenModal = {setOpenModal}
          />
          <SendMoney
          computeBalance = {computeBalance}
          transactionHistoryList = {transactionHistoryList}
          setOpenModal = {setOpenModal}
          />
          <button className="history" onClick={()=>setHistoryState(true)}>TransactionHistory</button>
         </div>
        }
        </div>
    )
     
}

export default Features;