import { FC, ReactElement } from 'react';
import { formatCurrency } from '../../helpers';

const CustomTable: FC<{ children: ReactElement; totalAmount: number }> = ({ children, totalAmount }) => {
  return (
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
            Date
          </th>
          <th scope="col" className=" px-6 py-4">
            Amount
          </th>
          <th scope="col" className=" px-6 py-4"></th>
        </tr>
      </thead>
      <tbody className="text-left">{children}</tbody>

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
          <th scope="col" className=" px-6 py-4"></th>
        </tr>
      </tfoot>
    </table>
  );
};

export default CustomTable;
