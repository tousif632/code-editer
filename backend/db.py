from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import MONGO_URI, DB_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# ✅ This is the function you're missing
async def get_transactions_for_wallet(wallet_address: str):
    collection = db.get_collection("transactions")
    cursor = collection.find({"wallet": wallet_address})
    transactions = []
    async for doc in cursor:
        transactions.append(doc)
    return transactions

def get_wallet_collection():
    return db.get_collection("wallets")