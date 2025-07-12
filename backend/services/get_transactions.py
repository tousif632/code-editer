import requests
from backend.config import ETHERSCAN_API_KEY

def get_wallet_transactions(address, limit=10):
    print(f"[DEBUG] Fetching transactions for: {address}")
    url = (
        f"https://api.etherscan.io/api"
        f"?module=account&action=txlist&address={address}"
        f"&startblock=0&endblock=99999999&page=1&offset={limit}"
        f"&sort=desc&apikey={ETHERSCAN_API_KEY}"
    )
    response = requests.get(url)
    data = response.json()

    if data.get("status") == "1":
        txs = data["result"]
    else:
        txs = []
    print(f"[DEBUG] Transactions fetched: {txs}")
    return txs
