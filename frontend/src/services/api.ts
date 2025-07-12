// src/api.ts
const BASE_URL = "http://127.0.0.1:8000";

export async function fetchWalletOverview(wallet: string) {
  const res = await fetch(`${BASE_URL}/api/wallet-overview/${wallet}`);
  return await res.json();
}

export async function fetchSuspiciousTransactions(wallet: string) {
  const res = await fetch(`${BASE_URL}/api/suspicious-transactions/${wallet}`);
  return await res.json();
}

export async function fetchTransactionGraph(wallet: string) {
  const res = await fetch(`${BASE_URL}/api/transaction-graph/${wallet}`);
  return await res.json();
}
