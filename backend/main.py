# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import wallet_routes  # Make sure this path is correct

app = FastAPI(
    title="CryptoGuardian API",
    description="Detect fraud in crypto wallets using AI",
    version="0.1"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
allow_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]


# Include your routes
app.include_router(wallet_routes.router)
