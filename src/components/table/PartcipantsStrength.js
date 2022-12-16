const PartcipantsStrength = ({ details }) => {
  const headers = [
    "Contingent Strength",
    "Male Contingent",
    "Female Contingent",
    "Eligibility Certificates Url",
    "Curriculum Vitae Url",
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
              {details.contingentStrength}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.totalContingentMale}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.totalContingentFemale}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.eligibilityCertificatesUrl}
            </td>
            <td className="bg-gray-100 px-4 py-2 text-sm">
              {details.curriculumVitaeUrl}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PartcipantsStrength;
