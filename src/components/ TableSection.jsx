// TableSection.jsx
import React from "react";

export default function TableSection({ title, rows }) {
  return (
    <section className="bg-gray-50 rounded shadow overflow-hidden max-w-5xl mx-auto mb-6">
      <h2 className="font-semibold text-xl p-6 pb-4 border-b border-gray-200 text-center">
        {title}
      </h2>
      <table className="w-full">
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className="divide-x divide-gray-200">
              {row.map((cell, j) => (
                <th
                  key={j}
                  className="px-4 py-4 text-center font-normal"
                  style={{ width: `${100 / row.length}%` }}
                >
                  <p className="text-sm font-medium text-gray-600">
                    {cell.label}
                  </p>
                  {cell.value && (
                    <p className="text-base text-gray-900 mt-1">{cell.value}</p>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
