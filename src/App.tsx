import { useState } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

type expensesType = {
  description: string;
  amount: number;
  timeStamp: string;
};

type expenseItemArgs = {
  description: string;
  amount: number;
};

const list: expensesType[] = [
  {
    description: 'This is a bigger description than others to check width of the TR',
    amount: 55,
    timeStamp: '8:00pm',
  },
  { description: 'Another description', amount: 25, timeStamp: '9:00pm' },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<expensesType[]>(list);

  const handleSubmit = (expenseItem: expenseItemArgs): void => {
    setExpenses((prev) => [...prev, { ...expenseItem, timeStamp: String(new Date()) }]);
    console.log(expenseItem);
  };

  return (
    <>
      <div className="p-4 m-0 flex flex-col items-center container mx-auto ">
        <ExpenseList expenses={expenses} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
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
