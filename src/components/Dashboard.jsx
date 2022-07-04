import React, {useState} from 'react'
import BalanceDashboard from './BalanceDashboard';
import Expenses from './Expenses';
import Features from './Features';
import Modal from 'react-modal';


function Dashboard(props){
    const{setLoginPass}=props
    let index;
    let currentUserDetails;
    const userDetailsLocal = JSON.parse(localStorage.getItem('userDetails'))
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let accountName;
    userDetailsLocal.forEach((element,elementIndex)=>{
        if(element.username===currentUser){
            index=elementIndex
            currentUserDetails=element
            accountName=element.accountName
        }
        })

    const [openModalState, setOpenModal] = useState({
        openModal:false,
        actionName:''
    })
    const{openModal,actionName} = openModalState

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
                    <BalanceDashboard
                    setLoginPass = {setLoginPass}
                    currentBalance = {currentBalance}
                    accountName = {accountName}
                    setOpenModal = {setOpenModal}
                    />
                    <Features
                    computeBalance = {computeBalance}
                    setOpenModal = {setOpenModal}
                    />
                    </div>
                </div>
                <div>
                    <Expenses
                    currentBalance = {currentBalance}
                    
                    />
                </div>
                <Modal
                    isOpen={openModal}
                    onRequestClose={()=>setOpenModal({openModal:false,actionName:''})}
                    style={
                    {
                        content:{
                        backgroundColor:'green',
                        opacity:'100%',
                        position:null,
                        border:null,
                        color:'yellow',
                        fontWeight:'bold',
                        fontSize:'2rem',
                        width: 'min-content',
                        border:'solid',
                        borderRadius:'7px',
                        textAlign:'center'

                        },
                        overlay:{
                        backgroundColor:'gray',
                        opacity:'90%',
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin:'auto',
                        }
                    }
                    }
                    >
                    <span>{actionName} SUCCESS!</span>
                </Modal>
            </div>
        </div>
    )
}

export default Dashboard;
