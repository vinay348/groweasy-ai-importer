type PreviewTableProps = {
  data: Record<string, any>[];
};

export default function PreviewTable({ data }: PreviewTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold">
          CSV Preview
        </h2>

        <p className="text-gray-500 mt-1">
          Showing {data.length} records
        </p>
      </div>

      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-blue-600 text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}