type Props = {
  data?: any[];
};

export default function ResultTable({ data }: Props) {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-auto">
      <table className="min-w-full text-sm md:text-base">
        <thead className="sticky top-0 bg-green-600 text-white">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left whitespace-nowrap font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-black">
          {data.map((row, index) => (
            <tr key={index}
              className="border-b border-gray-200 hover:bg-green-50 transition-colors">
              {headers.map((header) => (
                <td
                  key={header}
                  className="border px-4 py-2 whitespace-nowrap text-black border-gray-200"
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