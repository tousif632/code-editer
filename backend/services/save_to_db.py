from backend.db.mongo_utils import get_wallet_collection


async def save_transactions(wallet: str, transactions: list):
    collection = get_wallet_collection()

    if not transactions:
        print("No transactions received to save.")  # ✅ ADD THIS
        return 0

    for tx in transactions:
        tx["wallet"] = wallet

    print("Inserting into Mongo:", transactions[:1])  # ✅ ADD THIS

    result = await collection.insert_many(transactions)
    return len(result.inserted_ids)
