from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd


model = joblib.load("food_waste_rf_model.pkl")
model_features = joblib.load("model_features.pkl")

app = FastAPI(title="Food Waste Prediction API")


class FoodInput(BaseModel):
    food_type: str
    quantity_kg: float
    cooked_time_hrs: int
    storage_type: str
    temperature: float
    distance_to_ngo_km: float
    demand_level: str

@app.post("/predict")
def predict_waste(data: FoodInput):
    input_df = pd.DataFrame([data.dict()])
    # One-hot encode input
    input_df = pd.get_dummies(input_df)
    # Align columns with training features
    input_df = input_df.reindex(columns=model_features, fill_value=0)

    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]

    return {
        "will_waste": int(prediction),
        "waste_probability": round(float(probability), 2)
    }
