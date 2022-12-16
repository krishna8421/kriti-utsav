const Transaction = ({ details }) => {
  const headers = ["Transaction Number", "Total Amount", "Transaction Url"];

  return (
    <div className="scrollbar-hide w-full overflow-auto">
      <table className="whitespace-no-wrap w-full table-auto text-left">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="title-font bg-gray-300 px-4 py-3 text-sm font-medium tracking-wider text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.transactionNumber}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.totalAmount}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.transactionPhotoUrl}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
