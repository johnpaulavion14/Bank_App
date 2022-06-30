import React, { useState } from 'react'
import DepositFeature from './DepositFeature';
import WithdrawFeature from './WithdrawFeature';
import Userinfo from './Userinfo';
import SendMoney from './SendMoney';

function Features(props){
  const {computeBalance} = props
  
  return(
      <div className="features-section">
        <DepositFeature
        computeBalance = {computeBalance}
        />
        <WithdrawFeature
        computeBalance = {computeBalance}
        />
        <SendMoney
        computeBalance = {computeBalance}
        />
        <button>Account</button>
      </div>
  )
}

export default Features;