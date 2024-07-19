import { useState, useEffect } from 'react';
import { ExpenseItemArgs, ExpensesType } from '../types/Expense';

const useLocalStorageExpenses = (month: number, year: number) => {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);

  useEffect(() => {
    const fetchExpenses = () => {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) {
        const parsedExpenses = JSON.parse(savedExpenses);
        const filteredExpenses = parsedExpenses.filter(
          (expense: ExpensesType) =>
            new Date(expense.timeStamp).getMonth() + 1 === month && new Date(expense.timeStamp).getFullYear() === year
        );
        setExpenses(filteredExpenses);
      }
    };

    fetchExpenses();
  }, [month, year]);

  const addExpense = (expenseItem: ExpenseItemArgs): void => {
    const timeStamp = new Date();

    const newExpense = {
      ...expenseItem,
      timeStamp: timeStamp.toISOString(),
      month: timeStamp.getMonth() + 1,
      year: timeStamp.getFullYear(),
      id: timeStamp.toISOString(),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return { expenses, addExpense, deleteExpense };
};

export default useLocalStorageExpenses;
