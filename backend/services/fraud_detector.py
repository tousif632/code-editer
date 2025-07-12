from sklearn.ensemble import IsolationForest
import pandas as pd

def detect_anomalies(transactions):
    if not transactions:
        return []

    # Extract features
    df = pd.DataFrame(transactions)
    df["value"] = df["value"].astype(float)
    df["gas"] = df["gas"].astype(float)
    df["gasPrice"] = df["gasPrice"].astype(float)

    features = df[["value", "gas", "gasPrice"]]

    model = IsolationForest(contamination=0.1)
    preds = model.fit_predict(features)

    anomalies = df[preds == -1]

    return anomalies.to_dict(orient="records")
