import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    DietType: '',
    LocalFoodFrequency: '',
    EnergySource: '',
    HomeSize: '',
    EnvironmentalAwareness: '',
    CommunityInvolvement: '',
    MonthlyElectricityConsumption: '',
    MonthlyWaterConsumption: '',
    PhysicalActivities: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await fetch('https://sustainability-rating-25pu.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(`Failed to fetch prediction: ${err.message}`);
    }
  };

  return (
    <div className="h-screen bg-center flex items-center justify-center">
      
    <div className="bg-gray-100 p-10 rounded-2xl shadow-md max-w-xl w-full space-y-4">
    <div className="text-2xl text-center "><b>Sustainability Rating</b></div>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Age</label>
            <input className="w-full p-1 border rounded" id="Age" type="number" placeholder="Age" value={formData.Age} onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Clothing Frequency</label>
            <input className="w-full p-1 border rounded" id="DietType" type="text" placeholder="Clothing Frequency" value={formData.DietType} onChange={handleChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Local Food Frequency</label>
            <input className="w-full p-1 border rounded" id="LocalFoodFrequency" type="text" placeholder="Local Food Frequency" value={formData.LocalFoodFrequency} onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Plastic Usage Frequency</label>
            <input className="w-full p-1 border rounded" id="EnergySource" type="text" placeholder="Plastic Usage Frequency" value={formData.EnergySource} onChange={handleChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Home Size</label>
            <input className="w-full p-1 border rounded" id="HomeSize" type="text" placeholder="Home Size" value={formData.HomeSize} onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Environmental Awareness</label>
            <input className="w-full p-1 border rounded" id="EnvironmentalAwareness" type="text" placeholder="Environmental Awareness" value={formData.EnvironmentalAwareness} onChange={handleChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Community Involvement</label>
            <input className="w-full p-1 border rounded" id="CommunityInvolvement" type="text" placeholder="Community Involvement" value={formData.CommunityInvolvement} onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Monthly Electricity Consumption</label>
            <input className="w-full p-1 border rounded" id="MonthlyElectricityConsumption" type="text" placeholder="Monthly Electricity Consumption" value={formData.MonthlyElectricityConsumption} onChange={handleChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Monthly Water Consumption</label>
            <input className="w-full p-1 border rounded" id="MonthlyWaterConsumption" type="text" placeholder="Monthly Water Consumption" value={formData.MonthlyWaterConsumption} onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Physical Activities</label>
            <input className="w-full p-1 border rounded" id="PhysicalActivities" type="text" placeholder="Physical Activities" value={formData.PhysicalActivities} onChange={handleChange} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">Predict</button>
        </div>
      </form>
      {prediction && <div className="mt-4 text-center">Prediction: {prediction}</div>}
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
    </div>
    </div>
  );
}

export default App;
