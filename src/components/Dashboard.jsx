import React, {useState} from 'react'
import Userinfo from './Userinfo';
import Expenses from './Expenses';
import Features from './Features';

function Dashboard(){
    let index;
    let currentUserDetails;
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    userDetailsLocal.forEach((element,elementIndex)=>{
        if(element.username===currentUser){
            index=elementIndex
            currentUserDetails=element
        }
        })

    const [currentBalance, setCurrentBalance] = useState(currentUserDetails.currentBalance)
    const computeBalance = (featureValue)=>{
        const {deposit,withdraw,sendMoney} = featureValue
        setCurrentBalance(
            deposit?currentBalance + deposit:
            withdraw?currentBalance - withdraw:
            sendMoney?currentBalance - sendMoney:currentBalance
        ) 
    }
    
    currentUserDetails.currentBalance = currentBalance
    userDetailsLocal.splice(index,1,currentUserDetails)
    localStorage.setItem('userDetails',JSON.stringify(userDetailsLocal))
    console.log(currentBalance)
    return(
        <div className='main-container'>
            <header className='dashboard-header'>
            <span className='dashboard-logo'>-penny's bank-</span>
            <h1 className="title">PENNY'S BANK & BUDGET-APP</h1>
            </header>
            <div className='dashboard-container'>
                <div className='dashboard-section'>
                    <h3 className='dashboard-title'>Dashboard</h3>
                    <div className='bank-section'>
                    <Userinfo
                    currentBalance = {currentBalance}
                    
                    
                    />
                    <Features
                    computeBalance = {computeBalance}
                    />
                    </div>
                </div>
                <div>
                    <Expenses
                    currentBalance = {currentBalance}
                    
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
