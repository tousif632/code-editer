import React from 'react';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: number;
  timeStamp: string;
}

interface SuspiciousTableProps {
  transactions: Transaction[];
}

const SuspiciousTable: React.FC<SuspiciousTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-gray-500">✅ No suspicious transactions.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">⚠️ Suspicious Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead className="bg-red-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Tx Hash</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="text-sm text-center border-t hover:bg-red-50">
                <td className="px-4 py-2 truncate max-w-[120px] text-blue-600">{tx.hash.slice(0, 10)}...</td>
                <td className="px-4 py-2 truncate max-w-[120px]">{tx.from.slice(0, 10)}...</td>
                <td className="px-4 py-2 truncate max-w-[120px]">{tx.to.slice(0, 10)}...</td>
                <td className="px-4 py-2">{(tx.value / 1e18).toFixed(4)} ETH</td>
                <td className="px-4 py-2">{new Date(Number(tx.timeStamp) * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuspiciousTable;
