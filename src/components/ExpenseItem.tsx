import { formatCurrency } from '../helpers/formatCurrency';

type ExpenseItemProps = {
  index: number;
  amount: number;
  timeStamp: string;
  description: string;
  id: string;
  deleteExpense: (id: string) => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ index, amount, timeStamp, description, id, deleteExpense }) => {
  return (
    <tr className="border-b border-neutral-200 dark:border-white/10">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
      <td className="whitespace-nowrap px-6 py-4">{description}</td>

      <td className="whitespace-nowrap px-6 py-4">{timeStamp}</td>
      <td className="whitespace-nowrap px-6 py-4">{formatCurrency(amount)}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={() => deleteExpense(id)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
