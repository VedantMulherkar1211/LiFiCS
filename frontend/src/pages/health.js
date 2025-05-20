import React, { useState } from 'react';
import '../css/healthForm.css'; // Custom CSS
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';

const Health = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    bloodpressure: '',
    bloodglucose: '',
    heartrate: '',
    hairDensity: '',
    hairLossRate: '',
    scalpCondition: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      bmi: '',
      bloodpressure: '',
      bloodglucose: '',
      heartrate: '',
      hairDensity: '',
      hairLossRate: '',
      scalpCondition: ''
    });
  };

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content">
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2>Health Details Form</h2>
              </div>
              <form className="health-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <input name="gender" value={formData.gender} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>BMI</label>
                    <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Blood Pressure</label>
                    <input type="text" name="bloodpressure" value={formData.bloodpressure} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Blood Glucose (mg/dL)</label>
                    <input type="number" name="bloodglucose" value={formData.bloodglucose} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Heart Rate (bpm)</label>
                    <input type="number" name="heartrate" value={formData.heartrate} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Hair Density (per cm²)</label>
                    <input type="number" name="hairDensity" value={formData.hairDensity} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Hair Loss Rate (strands/day)</label>
                    <input type="number" name="hairLossRate" value={formData.hairLossRate} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Scalp Condition</label>
                    <input type="text" name="scalpCondition" value={formData.scalpCondition} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-buttons">
                  <button type="button" onClick={handleReset}>Reset</button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Health;
