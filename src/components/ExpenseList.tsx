import { useState, useEffect } from 'react';
import { formatDate } from '../helpers';
import CustomTable from './presentational/CustomTable';
import ExpenseItem from './ExpenseItem';

type ExpenseType = {
  description: string;
  amount: number;
  timeStamp: string;
  id: string;
};

const ExpenseList: React.FC<{ expenses: ExpenseType[]; onDeleteExpense: (id: string) => void }> = ({
  expenses,
  onDeleteExpense,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const amounts = expenses.reduce((prev, current) => {
    prev = prev + current.amount;
    return prev;
  }, 0);

  useEffect(() => {
    setTotalAmount(amounts);
  }, [amounts]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <CustomTable totalAmount={totalAmount}>
              <>
                {expenses.map((expense, index) => (
                  <ExpenseItem
                    key={index + expense.amount}
                    index={index}
                    amount={expense.amount}
                    timeStamp={formatDate(expense.timeStamp)}
                    description={expense.description}
                    id={expense.id}
                    deleteExpense={onDeleteExpense}
                  />
                ))}
              </>
            </CustomTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
