import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ExpenseItemArgs, ExpensesType } from '../types/Expense';

const useFirebaseExpenses = (month: number, year: number) => {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const q = query(collection(db, 'expenses'), where('month', '==', month), where('year', '==', year));
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ExpensesType));
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, [month, year]);

  const addExpense = async (expenseItem: ExpenseItemArgs): Promise<void> => {
    const timeStamp = new Date();

    const newExpense = {
      ...expenseItem,
      timeStamp: timeStamp.toISOString(),
      month: timeStamp.getMonth() + 1,
      year: timeStamp.getFullYear(),
    };

    const docRef = await addDoc(collection(db, 'expenses'), newExpense);
    setExpenses((prev) => [...prev, { ...newExpense, id: docRef.id }]);
  };

  const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, 'expenses', id));
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return { expenses, addExpense, deleteExpense };
};

export default useFirebaseExpenses;
