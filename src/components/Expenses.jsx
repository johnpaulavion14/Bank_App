import React, { useState , useEffect} from 'react'
import ExpensesListItem from './ExpensesListItem';
import ExpensesUpdateItem from './ExpensesUpdateItem';

function Expenses(props){
  const {currentBalance} = props
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const [state, setState] = useState({
    expenses:'',
    cost: '',
    expenseList: JSON.parse(localStorage.getItem(`${currentUser}Expenses`))?JSON.parse(localStorage.getItem(`${currentUser}Expenses`)):[]
  })

  const [isUpdate, setIsUpdate] = useState({
    updateExpenses:'',
    updateCost: ''
  })

  const { updateExpenses,updateCost} = isUpdate

  const { expenses,cost, expenseList } = state

  const handleOnClickEdit = (index) => {
    const newList = expenseList
    const list = expenseList[index] 
    list.update = true
    newList.splice(index, 1,list) 

    setIsUpdate({updateExpenses:newList[index].expenses,updateCost:newList[index].cost})
    setState({expenseList:newList})
    localStorage.setItem('expensesList',JSON.stringify(expenseList))
  }

  const handleOnExpense = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleOnCost = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
    
  /* CREATE */
  const createExpensesList = () => {
    const list = expenseList 
    const expensesAndCost = {}
    expensesAndCost.expenses = expenses
    expensesAndCost.cost = cost
    expensesAndCost.update = false

    list.push(expensesAndCost) 
  

    setState({ expenses:'',cost: '', expenseList:list})
    localStorage.setItem(`${currentUser}Expenses`,JSON.stringify(expenseList))

  }

  /* DELETE */
  const deleteTodo = (index) => {
    const list = expenseList 
    list.splice(index, 1) 

    setState({ expenses: '',cost:'', expenseList: list })
    localStorage.setItem(currentUser,JSON.stringify(expenseList))
  }

  /* UPDATE */
  const updateOnExpense = (e) => {
    const { name, value } = e.target
    setIsUpdate({ ...isUpdate, [name]: value })
  }

  const updateOnCost = (e) => {
    const { name, value } = e.target
    setIsUpdate({ ...isUpdate, [name]: value })
  }
  const clickUpdate = (index) => {
    const list = expenseList 
    const expensesAndCost = {}
    expensesAndCost.expenses = updateExpenses
    expensesAndCost.cost = updateCost
    expensesAndCost.update = false

    list.splice(index, 1,expensesAndCost) 

    setState({ expenses:'',cost: '', expenseList:list})
    localStorage.setItem(`${currentUser}Expenses`,JSON.stringify(expenseList))
  }
  const clickCancel = (index) => {
    const newList = expenseList
    const list = expenseList[index] 
    list.update = false
    newList.splice(index, 1,list) 
    setState({expenseList:newList})
    localStorage.setItem(`${currentUser}Expenses`,JSON.stringify(expenseList))
  }
  //Add total expenses
  const costContainer = expenseList.map(element => element.cost)
  const totalExpenses = costContainer.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0)
  const newBalance = currentBalance - totalExpenses
  
 
    return(
        <div className="expense-container">
            <span className="expenses-title">Expenses</span>
            <div className="expense-section">
                <section className="expense-cost-container">
                    <div className="expense-cost">
                        <div className="expense">
                            <label for="expense">Expense Name:</label>
                            <input id="expense" type="text" placeholder="expense name" name="expenses" value={expenses} onChange={handleOnExpense}
                            minlength="4" maxlength="8" size="10"/>
                        </div>
                        <div className="cost">
                            <label for="cost">Cost:</label>
                            <input id="cost" type="letter" placeholder="cost" name="cost" value={cost} onChange={handleOnCost}
                            minlength="4" maxlength="8" size="10"/>
                        </div>
                    </div>
                    <button onClick={createExpensesList} className="addexpense-button">Add Expense</button>
                </section>
                <section className="expense-lists">
                    <div className="item-lists">
                      <span className="expense-lists-title">Lists of your expenses:</span>
                      {
                        expenseList.length ?
                          expenseList.map((value, index) => (
                            value.update ?
                            <ExpensesUpdateItem
                              key={index}
                              index={index}
                              updateOnExpense={updateOnExpense}
                              updateOnCost={updateOnCost}
                              updateExpenses={updateExpenses}
                              updateCost={updateCost}
                              clickUpdate={clickUpdate}
                              clickCancel={clickCancel}
                              />
                           :
                            <ExpensesListItem
                              key={index}
                              index={index}
                              value={value}
                              deleteTodo={deleteTodo}
                              handleOnClickEdit={handleOnClickEdit}
                              expenseListItem = {expenseList}
                            />
                          )) : <span>No Expenses Found!</span>
                      }
                    </div>
                    <div className='computeBalance'>
                      <span className='compute-balance-title'>Balance Computation:</span>
                      <div>
                        <span>Current Balance</span>
                        <div>{currentBalance}</div>
                      </div>
                      <div>
                      <span>Total Expenses</span>
                        <div>{totalExpenses}</div>
                      </div>
                      <div>
                      <span>New Balance</span>
                        <div>{newBalance}</div>
                      </div>

                    </div>

                </section>
            </div>
        </div>
    )
}

export default Expenses;