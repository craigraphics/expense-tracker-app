import { formatCurrency } from '../helpers/formatCurrency';

type ExpenseItemProps = {
  index: number;
  amount: number;
  timeStamp: string;
  description: string;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ index, amount, timeStamp, description }) => {
  return (
    <tr className="border-b border-neutral-200 dark:border-white/10">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
      <td className="whitespace-nowrap px-6 py-4">{description}</td>

      <td className="whitespace-nowrap px-6 py-4">{timeStamp}</td>
      <td className="whitespace-nowrap px-6 py-4">{formatCurrency(amount)}</td>
    </tr>
  );
};

export default ExpenseItem;
