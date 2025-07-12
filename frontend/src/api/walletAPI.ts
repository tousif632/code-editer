const BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchWalletOverview(wallet: string) {
  const res = await fetch(`${BASE_URL}/wallet-overview/${wallet}`);
  return await res.json();
}

export async function fetchSuspiciousTransactions(wallet: string) {
  const res = await fetch(`${BASE_URL}/suspicious-transactions/${wallet}`);
  return await res.json();
}

export async function fetchTransactionGraph(wallet: string) {
  const res = await fetch(`${BASE_URL}/transaction-graph/${wallet}`);
  return await res.json();
}
