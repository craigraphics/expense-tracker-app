import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

type ExpensesType = {
  description: string;
  amount: number;
  timeStamp: string;
  id: string;
};

type ExpenseItemArgs = {
  description: string;
  amount: number;
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchExpenses(month, year);
  }, [month, year]);

  const fetchExpenses = async (month: number, year: number) => {
    const q = query(collection(db, 'expenses'), where('month', '==', month), where('year', '==', year));
    const querySnapshot = await getDocs(q);
    const expensesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ExpensesType));
    setExpenses(expensesData);
  };

  const handleSubmit = async (expenseItem: ExpenseItemArgs): Promise<void> => {
    const timeStamp = new Date();

    const newExpense = {
      ...expenseItem,
      timeStamp: timeStamp.toISOString(),
      month: timeStamp.getMonth() + 1,
      year: timeStamp.getFullYear(),
    };

    const docRef = await addDoc(collection(db, 'expenses'), newExpense);

    setExpenses((prev) => [...prev, { ...newExpense, id: docRef.id }]);
    setShowModal(false);
  };

  const onDeleteExpense = async (id: string) => {
    await deleteDoc(doc(db, 'expenses', id));
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <div className="p-4 m-0 flex flex-col items-center container mx-auto">
        <h1 className="mb-3">Expense Tracker</h1>
        <div className="flex space-x-4 mb-4">
          <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
            {monthNames.map((name, i) => (
              <option key={i} value={i + 1}>
                {name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-1"
          />
        </div>
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
