import React, { useState } from 'react'

function TransactionHistory(props){
    const {setHistoryState} = props
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const transactionHistory = JSON.parse(localStorage.getItem(`${currentUser}Transactions`))?JSON.parse(localStorage.getItem(`${currentUser}Transactions`)):[]
    console.log(transactionHistory)
 
    return(
        <section className="history-section">
            <table className='table-history'>
            <caption>Transaction History</caption>
                <tr>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Date</th>
                </tr>
                {
                    transactionHistory.length ?
                    transactionHistory.map(element=> {
                    return(
                    <tr>
                        <td>{element.action}</td>
                        <td>{element.amount}</td>
                        <td>{element.sender}</td>
                        <td>{element.recipient}</td>
                        <td>{element.date}</td>
                    </tr>
                    )
                    })
                :
                <tr>

                </tr>
                }
            </table>
                <button className="login-button" onClick={() => setHistoryState(false)}>go back</button>
        </section>
    )
}

export default TransactionHistory;


