const ExpensesUpdateItem = props => {
    const {
        index,
        updateOnExpense,
        updateOnCost,
        updateExpenses,
        updateCost,
        clickUpdate,
        clickCancel
      } = props

    return(
    <div className="expensesUpdateItem">
        <input id="expense" type="text" placeholder="expense name" name="updateExpenses" value={updateExpenses} onChange={updateOnExpense}
        minlength="4" maxlength="8" size="10"/>
        <input id="cost" type="number" placeholder="cost" name="updateCost" value={updateCost} onChange={updateOnCost}
        minlength="4" maxlength="5" size="10"/>
        <button className="update-expense-list" onClick={()=>clickUpdate(index)}>.</button>
        <button className="cancelupdate-expense-list" onClick={()=>clickCancel(index)}>.</button>
    </div>

    )
}
export default ExpensesUpdateItem
