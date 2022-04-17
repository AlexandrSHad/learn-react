import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const addButtonClickHandler = () => {
    setIsEditMode(true);
  };

  const saveExpenseDataHandler = expenseData => {
    const expense = {
      ...expenseData,
      id: Math.random().toString()
    }

    props.onAddExpense(expense);
    setIsEditMode(false);
  };

  const cancelNewExpenseHandler = () => {
    setIsEditMode(false);
  };

  return <div className="new-expense">
    {!isEditMode && (
      <button onClick={addButtonClickHandler}>Add New Expense</button>
    )}
    {isEditMode && (
      <ExpenseForm
        onSaveExpenseData={saveExpenseDataHandler}
        onCancelNewExpense={cancelNewExpenseHandler}
      />
    )}
  </div>
}

export default NewExpense;