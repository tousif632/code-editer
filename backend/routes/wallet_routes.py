from fastapi import APIRouter
from backend.services.get_transactions import get_wallet_transactions
from backend.services.save_to_db import save_transactions
from backend.services.fraud_detector import detect_anomalies
from backend.db.mongo import get_wallet_collection
from backend.db.queries import get_transactions_for_wallet

from backend.services.stream_wallet import (
    stream_wallet_activity,
    get_wallet_overview,
    get_suspicious_transactions,
    get_transaction_graph,
)

import asyncio
router = APIRouter()
# ✅ Add prefix so /api/xyz routes work correctly
router = APIRouter(prefix="/api")

@router.get("/fetch/{wallet_address}")
async def fetch_and_store(wallet_address: str):
    txs = get_wallet_transactions(wallet_address)
    await save_transactions(wallet_address, txs)
    
    frauds = detect_anomalies(txs)

    # Convert ObjectId to string for JSON response
    for fraud in frauds:
        if "_id" in fraud:
            fraud["_id"] = str(fraud["_id"])

    return {
        "fetched": len(txs),
        "suspicious_count": len(frauds),
        "suspicious": frauds
    }

@router.get("/stream/{wallet_address}")
async def start_stream(wallet_address: str):
    asyncio.create_task(stream_wallet_activity(wallet_address))
    return {"message": f"Started streaming for {wallet_address}"}

@router.get("/wallet/overview")
async def get_wallet_overview():
    return {
        "address": "0x123...abc",
        "risk_score": "80%",
        "total_tx": 120,
        "suspicious_tx": 3
    }


@router.get("/suspicious-transactions/{wallet_address}")
def suspicious_transactions(wallet_address: str):
    return get_suspicious_transactions(wallet_address)

@router.get("/transaction-graph/{wallet_address}")
def transaction_graph(wallet_address: str):
    return get_transaction_graph(wallet_address)
