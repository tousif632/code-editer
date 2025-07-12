# backend/db/mongo.py

from pymongo import MongoClient

def get_wallet_collection():
    client = MongoClient("mongodb://localhost:27017")  # Or your MongoDB URI
    db = client["cryptoguardian"]
    return db["wallets"]
