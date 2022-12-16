const Travelinfo = ({ details }) => {
  const headers = [
    "Arrival Date (YYYY-MM-DD)",
    "Arrival Time",
    "Arrival Mode",
    "Departure Date (YYYY-MM-DD)",
    "Departure Time",
    "Departure Mode",
  ];

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
              {details.arrivalDate}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.arrivalTime}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.arrivalMode}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.departureDate}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.departureTime}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.departureMode}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Travelinfo;
