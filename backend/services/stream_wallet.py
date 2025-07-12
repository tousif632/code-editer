import asyncio
from backend.services.get_transactions import get_wallet_transactions
from backend.services.save_to_db import save_transactions
from backend.db.queries import get_transactions_for_wallet






async def stream_wallet_activity(wallet_address: str, interval: int = 30):
    seen_tx_hashes = set()

    while True:
        print(f"🔄 Checking new transactions for {wallet_address}...")
        transactions = get_wallet_transactions(wallet_address)
        new_transactions = [tx for tx in transactions if tx['hash'] not in seen_tx_hashes]

        if new_transactions:
            print(f"🆕 {len(new_transactions)} new transaction(s) found.")
            await save_transactions(wallet_address, new_transactions)

            # Add new tx hashes to seen
            seen_tx_hashes.update(tx['hash'] for tx in new_transactions)
        else:
            print("✅ No new transactions.")

        await asyncio.sleep(interval)
        # backend/services/stream_wallet.py
  # adjust import as needed

async def get_wallet_overview(wallet_address: str):
    txs = await get_transactions_for_wallet(wallet_address)
    suspicious = [tx for tx in txs if tx.get("is_suspicious")]

    return {
        "wallet": wallet_address,
        "total": len(txs),
        "suspicious": len(suspicious),
        "risk_score": len(suspicious) * 10  # or any formula
    }


def get_suspicious_transactions(wallet_address: str):
    # Dummy suspicious transactions
    return [
        {
            "hash": "0xddf43f475813...",
            "from": "0x7cbb8e90...",
            "to": wallet_address,
            "value": 100000000000000,
            "timeStamp": "1751407055"
        }
    ]

def get_transaction_graph(wallet_address: str):
    # Dummy transaction graph data
    return [
        {"from": "0xAAA", "to": "0xBBB", "value": 100},
        {"from": "0xBBB", "to": "0xCCC", "value": 200},
        {"from": "0xAAA", "to": "0xCCC", "value": 50}
    ]
