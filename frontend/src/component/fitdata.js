// GoogleFitDashboard.js

import React, { useState } from 'react';
import axios from 'axios';

function GoogleFitDashboard() {
  const [accessToken, setAccessToken] = useState('');
  const [steps, setSteps] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [calories, setCalories] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const now = new Date();
    const start = new Date(now.setHours(0, 0, 0, 0)).getTime();
    const end = new Date().getTime();

    try {
      const res = await axios.post('http://localhost:5000/api/steps', {
        accessToken,
        startTimeMillis: start,
        endTimeMillis: end,
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
          },
          {
            dataTypeName: 'com.google.heart_rate.bpm',
            dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
          },
          {
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
          },
          {
            dataTypeName: 'com.google.distance.delta',
            dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta',
          },
        ],
      });

      const datasets = res.data.bucket[0]?.dataset || [];

      const totalSteps = datasets[0]?.point?.reduce((total, point) => total + (point.value[0].intVal || 0), 0) || 0;
      const avgHeartRate = datasets[1]?.point?.length
        ? (datasets[1].point.reduce((sum, p) => sum + (p.value[0].fpVal || 0), 0) / datasets[1].point.length).toFixed(2)
        : null;
      const totalCalories = datasets[2]?.point?.reduce((sum, p) => sum + (p.value[0].fpVal || 0), 0).toFixed(2);
      const totalDistanceKm = (datasets[3]?.point?.reduce((sum, p) => sum + (p.value[0].fpVal || 0), 0) / 1000).toFixed(2);

      setSteps(totalSteps);
      setHeartRate(avgHeartRate);
      setCalories(totalCalories);
      setDistance(totalDistanceKm);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Google Fit Daily Stats</h1>
      <input
        type="text"
        placeholder="Enter Access Token"
        className="border p-2 w-full mb-2"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
      />
      <button onClick={fetchData} className="bg-blue-500 text-white p-2 rounded w-full mb-2">
        {loading ? 'Loading...' : 'Fetch Today\'s Data'}
      </button>

      {steps !== null && <div className="mt-4 text-lg">Step Count: <strong>{steps}</strong></div>}
      {heartRate !== null && <div className="text-lg">Avg. Heart Rate: <strong>{heartRate} bpm</strong></div>}
      {calories !== null && <div className="text-lg">Calories Burned: <strong>{calories} kcal</strong></div>}
      {distance !== null && <div className="text-lg">Distance Walked: <strong>{distance} km</strong></div>}
    </div>
  );
}

export default GoogleFitDashboard;
