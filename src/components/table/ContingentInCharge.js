const ContingentInCharge = ({ details }) => {
  const headers = ["Name", "Email", "Mobile", "Gender", "Address", "Photourl"];

  let tableRows = [];
  for (var i = 0; i < details.length; i++) {
    const row = details[i];
    let temp = [];
    for (const item in row) {
      if (item !== "id" && item !== "userResponseId") temp.push(row[item]);
    }
    tableRows.push(temp);
  }

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
          {tableRows.map((row_value, index) => (
            <tr key={index}>
              {row_value.map((cell_value, index) => (
                <td key={index} className="bg-gray-100 px-4 py-2 text-sm">
                  {cell_value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContingentInCharge;
