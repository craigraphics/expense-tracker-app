import { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

type expensesType = {
  description: string;
  amount: number;
  timeStamp: string;
  id: string;
};

type expenseItemArgs = {
  description: string;
  amount: number;
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<expensesType[]>([]);

  const handleSubmit = (expenseItem: expenseItemArgs): void => {
    const newExpense = {
      ...expenseItem,
      timeStamp: new Date().toISOString(),
      id: new Date().toISOString(),
    };

    setExpenses((prev) => {
      const updatedExpenses = [...prev, newExpense];
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  const onDeleteExpense = (id: string) => {
    const remainingExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(remainingExpenses);
    localStorage.setItem('expenses', JSON.stringify(remainingExpenses));
  };

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  return (
    <>
      <div className="p-4 m-0 flex flex-col items-center container mx-auto ">
        <h1>Expense Tracker</h1>
        <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Expense
        </button>
      </div>
      {showModal && <ExpenseForm onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
    </>
  );
}

export default App;
