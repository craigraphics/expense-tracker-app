import { FC } from 'react';

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

interface Props {
  month: number;
  setMonth: (e: number) => void;
  year: number;
  setYear: (e: number) => void;
}

const DatePicker: FC<Props> = ({ month, setMonth, year, setYear }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <div className="relative inline-flex self-center">
          <svg
            className=" bg-gray-600 absolute top-0 right-0 m-2 pointer-events-none p-2 rounded"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 38 22"
            version="1.1"
          >
            <g id="ZahnhelferDE—Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                id="ZahnhelferDE–Icon&amp;Asset-Download"
                transform="translate(-539.000000, -199.000000)"
                fill="#ffffff"
                fillRule="nonzero"
              >
                <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                  <polygon
                    id="Path-Copy"
                    transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) "
                    points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"
                  />
                </g>
              </g>
            </g>
          </svg>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="rounded border border-gray-600 h-12 w-60 pl-3 pr-10 hover:border-gray-400 focus:outline-none appearance-none"
          >
            {monthNames.map((name, i) => (
              <option key={i} value={i + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        className="shadow appearance-none border border-gray-600 hover:border-gray-400 rounded w-full py-2 pl-3"
      />
    </div>
  );
};

export default DatePicker;
