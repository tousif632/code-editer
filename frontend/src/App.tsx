import React, { useEffect, useState } from 'react';
import WalletOverview from './components/WalletOverview';
import SuspiciousTable from './components/SuspiciousTable';
import TransactionGraph from './components/TransactionGraph';
import {
  fetchWalletOverview,
  fetchSuspiciousTransactions,
  fetchTransactionGraph,
} from './services/api';

// Wallet to inspect
const WALLET = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Types
type WalletOverviewType = {
  total: number;
  suspicious: number;
  risk_score: number;
};

type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: number;
  timeStamp: string;
};

type GraphTransaction = {
  from: string;
  to: string;
  value: number;
};

function App() {
  const [overview, setOverview] = useState<WalletOverviewType | null>(null);
  const [suspicious, setSuspicious] = useState<Transaction[]>([]);
  const [graph, setGraph] = useState<GraphTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [overviewData, suspiciousData, graphData] = await Promise.all([
          fetchWalletOverview(WALLET),
          fetchSuspiciousTransactions(WALLET),
          fetchTransactionGraph(WALLET),
        ]);
        setOverview(overviewData);
        setSuspicious(suspiciousData);
        setGraph(graphData);
      } catch (err) {
        console.error("❌ Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-blue-500 text-lg animate-pulse">
        🔄 Loading dashboard...
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="p-6 text-center text-red-500">
        ❌ Failed to load wallet overview. Please check the API server.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">✅ CryptoGuardian Dashboard</h1>

      <WalletOverview
      wallet={WALLET}
      totalTxs={overview.total}
      suspiciousTxs={suspicious.length}
      riskScore={overview.risk_score}
  />


      <TransactionGraph transactions={graph} />

      <SuspiciousTable transactions={suspicious} />
    </div>
  );
}

export default App;
