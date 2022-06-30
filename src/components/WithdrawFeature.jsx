import React, { useState } from 'react'

function WithdrawFeature (props){
    const {computeBalance} = props

  const [withdrawState, setWithdrawState] = useState({
    withdraw:'',
    withdrawActive:false
  })
  const {withdraw,withdrawActive} = withdrawState

  const handleOnWithdraw = (e) => {
    const { name, value } = e.target
    setWithdrawState({ ...withdrawState, [name]: value })
  }

  const clickWithdraw = () => {
    setWithdrawState({ withdraw:'', withdrawActive: true })
  }
  const clickWithdrawProceed = () => {
    setWithdrawState({ ...withdrawState, withdrawActive: false })
    computeBalance({withdraw:Number(withdraw)})
  }
  const clickCancelWithdraw = () => {
    setWithdrawState({ ...withdrawState, withdrawActive: false })
  }
    return(
        <section className="withdraw-section">
        {
            withdrawActive?
            <div>
                <label for="withdraw">Withdraw:</label>
                <input id="withdraw" type="number" placeholder="withdraw money" name="withdraw" value={withdraw} 
                minlength="4" maxlength="8" size="10" onChange={handleOnWithdraw}/>
                <button className="proceed" onClick={() => clickWithdrawProceed()}>Proceed</button>
                <button className="cancelWithdraw" onClick={() => clickCancelWithdraw()}>Cancel</button>
            </div>
            :
            <button className="withdraw" onClick={() => clickWithdraw()}>Withdraw</button>
        }
        </section>
    )
}

export default WithdrawFeature;