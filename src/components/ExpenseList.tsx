import { useState, useEffect } from 'react';
import { formatCurrency } from '../helpers/formatCurrency';
import ExpenseItem from './ExpenseItem';

type ExpenseType = {
  description: string;
  amount: number;
  timeStamp: string;
};

const ExpenseList: React.FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
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
            <table className="min-w-full text-sm font-light text-surface dark:text-white text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    #
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Description
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Amount
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="text-left">
                {expenses.map((expense, index) => (
                  <ExpenseItem
                    key={index + expense.amount}
                    index={index}
                    amount={expense.amount}
                    timeStamp={expense.timeStamp}
                    description={expense.description}
                  />
                ))}
              </tbody>

              <tfoot className="border-b border-neutral-200 bg-neutral-900 font-medium dark:border-white/10 dark:text-neutral-">
                <tr>
                  <th scope="col" className=" px-6 py-4"></th>
                  <th scope="col" className=" px-6 py-4">
                    Total
                  </th>
                  <th scope="col" className=" px-6 py-4"></th>
                  <th scope="col" className=" px-6 py-4">
                    {formatCurrency(totalAmount)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
