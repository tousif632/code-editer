import React from 'react';

interface WalletOverviewProps {
  wallet: string;
  totalTxs: number;
  suspiciousTxs: number;
  riskScore: number; // 0–100
}

const WalletOverview: React.FC<WalletOverviewProps> = ({ wallet, totalTxs, suspiciousTxs, riskScore }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Wallet Overview</h2>
      <p><strong>Address:</strong> {wallet}</p>
      <p><strong>Total Transactions:</strong> {totalTxs}</p>
      <p><strong>Suspicious Transactions:</strong> {suspiciousTxs}</p>
      <p><strong>Risk Score:</strong> <span className="text-red-500">{riskScore}%</span></p>
    </div>
  );
};

export default WalletOverview;
