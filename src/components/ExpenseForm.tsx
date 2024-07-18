import { useState } from 'react';

type amountType = {
  description: string;
  amount: number;
};

type ExpenseFormType = {
  onClose: () => void;
  onSubmit: ({ description, amount }: amountType) => void;
};

const ExpenseForm: React.FC<ExpenseFormType> = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!description || amount <= 0) {
      setError('All fields are required, and amount must be greater than zero');
      return;
    }
    onSubmit({
      description,
      amount,
    });
    onClose();
  };

  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setDescription(e.target.value);
  };

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setAmount(parseFloat(e.target.value));
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/[.8]">
        <div className="relative my-6 mx-auto w-96">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-600 rounded-t ">
              <h3 className="text-3xl font-semibold">Add a new expense</h3>
            </div>

            <div className="relative p-6 flex-auto">
              {error && <p className="text-red-500 mb-3">{error}</p>}
              <form className=" w-full">
                <label className="block text-sm mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={changeDescription}
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-1"
                />
                <label className="block text-sm mb-2 mt-2">Amount $</label>
                <input
                  type="number"
                  value={amount}
                  onChange={changeAmount}
                  className=" border border-gray-600 w-full py-2 px-1"
                />
              </form>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-600 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
