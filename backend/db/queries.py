from backend.db.mongo_utils import get_wallet_collection

def get_transactions_for_wallet(wallet_address): # or wherever it's defined

    collection = get_wallet_collection()
    return collection.find({"wallet": wallet_address})
