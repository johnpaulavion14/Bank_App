import React, { useState } from 'react'

function DepositFeature (props){
  const {computeBalance,transactionHistoryList,currentAccountName,setOpenModal} = props

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
    setDepositState({ ...depositState, depositActive: false })
    computeBalance({deposit:Number(deposit)})
    transactionHistoryList('Deposit',deposit,currentAccountName,'')
    setOpenModal({openModal:true,actionName:'DEPOSIT'})
    
  }
  const clickCancelDeposit = () => {
    setDepositState({ ...depositState, depositActive: false })
  }
    return(
        <section className="deposit-section">
        {
            depositActive?
            <div>
              <form className='deposit-form' onSubmit={clickDepositProceed}>
                <label for="deposit">Deposit:</label>
                <input id="deposit" type="number" placeholder="deposit money" name="deposit" value={deposit} required
                minlength="4" maxlength="8" size="10" onChange={handleOnDeposit}/>
                <input type="submit" value="Proceed" className="login-button" />
                <button className="cancel-button" onClick={() => clickCancelDeposit()}>Cancel</button>
              </form>
            </div>
            :
            <button className="deposit" onClick={() => clickDeposit()}>Deposit</button>
        }
        </section>
    )
}

export default DepositFeature;