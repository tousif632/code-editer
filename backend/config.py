import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "crypto_db")
ETHERSCAN_API_KEY = os.getenv("ETHERSCAN_API_KEY")