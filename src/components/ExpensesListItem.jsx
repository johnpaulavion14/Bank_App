const ExpensesListItem = props => {
  const {
    index,
    value,
    deleteTodo,
    handleOnClickEdit,
    // expenseListItem
  } = props
  const {expenses,cost}=value

  return (
    <div className="row-wrapper">
      <span>{expenses}</span>
      <span>{cost}</span>
      {/* <button onClick={() => handleOnClickEdit(index, value)}>Edit</button> */}
      <button className="edit-icon" onClick={() => handleOnClickEdit(index)}>.</button>
      <button className="delete-icon" onClick={() => deleteTodo(index)}>.</button>
    </div>
  )
}

export default ExpensesListItem