import requests
from backend.config import ETHERSCAN_API_KEY

def get_wallet_transactions(address, limit=10):
    url = (
        f"https://api.etherscan.io/api"
        f"?module=account&action=txlist&address={address}"
        f"&startblock=0&endblock=99999999&page=1&offset={limit}"
        f"&sort=desc&apikey={ETHERSCAN_API_KEY}"
    )
    response = requests.get(url)
    data = response.json()

    print("Etherscan Raw Response:", data)  # ✅ ADD THIS

    if data.get("status") == "1":
        print(f"Returning {len(data['result'])} transactions")
        return data["result"]
    else:
        print("Etherscan returned empty or error")
        return []
