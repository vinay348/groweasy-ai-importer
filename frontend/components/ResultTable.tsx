type Props = {
  data: any[];
};

export default function ResultTable({ data }: Props) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-auto">
      <table className="min-w-full">
        <thead className="bg-green-600 text-white">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td
                  key={header}
                  className="border px-4 py-2"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}