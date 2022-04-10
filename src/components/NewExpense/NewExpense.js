import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const onSaveExpenseDataHandler = expenseData => {
    const expense = {
      ...expenseData,
      id: Math.random().toString()
    }

    props.onAddExpense(expense);
  };

  return <div className="new-expense">
    <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
  </div>
}

export default NewExpense;