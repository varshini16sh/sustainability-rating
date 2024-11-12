from pydantic import BaseModel
from fastapi import FastAPI
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # React frontend
    "http://localhost:8001",  # Backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("C:\\Users\\vaish\\Downloads\\sustainability_rating_PKL.pkl")


class PredictionRequest(BaseModel):
    Age: int
    DietType: str
    LocalFoodFrequency: str
    EnergySource: str
    HomeSize: str
    EnvironmentalAwareness: str
    CommunityInvolvement: str
    MonthlyElectricityConsumption: str
    MonthlyWaterConsumption: str
    PhysicalActivities: str
    
@app.post("/predict")
async def predict(request: PredictionRequest):
    features = [
        request.Age,
        request.DietType,
        request.LocalFoodFrequency,
        request.EnergySource,
        request.HomeSize,
        request.EnvironmentalAwareness,
        request.CommunityInvolvement,
        request.MonthlyElectricityConsumption,
        request.MonthlyWaterConsumption,
        request.PhysicalActivities,
    ]
    # Assuming you have a pre-trained model loaded as `model`
    prediction = model.predict([features])
    prediction = prediction[0].item()
    return {"prediction": prediction}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

