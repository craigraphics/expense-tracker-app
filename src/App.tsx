import { FC, useState } from 'react';
// import useFirebaseExpenses from './hooks/useFirebaseExpenses';
import useLocalStorageExpenses from './hooks/useLocalStorageExpenses';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import DatePicker from './components/DatePicker';

const App: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // const { expenses, addExpense, deleteExpense } = useFirebaseExpenses(month, year);
  const { expenses, addExpense, deleteExpense } = useLocalStorageExpenses(month, year);

  return (
    <>
      <div className="p-4 m-0 flex flex-col items-center container mx-auto">
        <h1 className="mb-5 font-semibold text-2xl">Expense Tracker</h1>
        <DatePicker month={month} setMonth={setMonth} year={year} setYear={setYear} />
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Expense
        </button>
      </div>
      {showModal && <ExpenseForm onClose={() => setShowModal(false)} onSubmit={addExpense} />}
    </>
  );
};

export default App;
