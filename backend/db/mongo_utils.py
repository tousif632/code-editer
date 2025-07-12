# backend/db/mongo_utils.py

from pymongo import MongoClient

def get_wallet_collection():
    client = MongoClient("mongodb://localhost:27017")  # or your connection string
    db = client["your_db_name"]
    return db["wallets"]
