import React, { useState } from 'react'

function DepositFeature (props){
    const {computeBalance} = props
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    let index;
    let currentUserDetails;
    userDetailsLocal.forEach((element,elementIndex)=>{
      if(element.username===currentUser){
          index=elementIndex
          currentUserDetails=element
      }
      })

  const [depositState, setDepositState] = useState({
    deposit:'',
    depositActive:false
  })
  const {deposit,depositActive} = depositState

  const handleOnDeposit = (e) => {
    const { name, value } = e.target
    setDepositState({ ...depositState, [name]: value })
  }

  const clickDeposit = () => {
    setDepositState({ deposit:'', depositActive: true })
  }
  const clickDepositProceed = () => {
    currentUserDetails.currentBalance = deposit
    userDetailsLocal.splice(index,1,currentUserDetails)
    localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
    setDepositState({ ...depositState, depositActive: false })
    computeBalance({deposit:Number(deposit)})


    
    console.log(userDetailsLocal)
  }
  const clickCancelDeposit = () => {
    setDepositState({ ...depositState, depositActive: false })
  }
    return(
        <section className="deposit-section">
        {
            depositActive?
            <div>
                <label for="deposit">Deposit:</label>
                <input id="deposit" type="number" placeholder="deposit money" name="deposit" value={deposit} 
                minlength="4" maxlength="8" size="10" onChange={handleOnDeposit}/>
                <button className="proceed" onClick={() => clickDepositProceed()}>Proceed</button>
                <button className="cancelDeposit" onClick={() => clickCancelDeposit()}>Cancel</button>
            </div>
            :
            <button className="deposit" onClick={() => clickDeposit()}>Deposit</button>
        }
        </section>
    )
}

export default DepositFeature;