import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';
import '../css/dashboard.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([ // Example bar chart data
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 500 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/81d8f901-c708-4c3b-88bd-dc4e3b910cf4');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          name: item.name,
          value: item.value
        }));
        setPieChartData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || error) {
    return (
      <div className="dashboard-container">
        <TopNav />
        <div className="dashboard-wrapper">
          <SideNav />
          <main className="dashboard-content">
            <div className="card-row">
              <div className="full-width-card card">
                <div className="card-header">
                  <h2 className="card-title">{error ? 'Error' : 'Loading...'}</h2>
                </div>
                <div className="card-body">
                  <p>{error ? `Error fetching data: ${error.message}` : 'Loading pie chart data...'}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content">
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2 className="card-title">Analytics Overview</h2>
                <div className="card-actions">
                  <FontAwesomeIcon icon={faShare} />
                  <FontAwesomeIcon icon={faBullseye} />
                  <FontAwesomeIcon icon={faDownload} />
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </div>
              <div className="card-body" style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} (${value})`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card-row">
            {[1, 2].map((num) => (
              <div className="quarter-card card" key={num}>
                <div className="card-header">
                  <h2 className="card-title">Card {num}</h2>
                </div>
                <div className="card-body">
                  {num === 1 && (
                    <div style={{ width: '100%', height: '150px' }}> {/* Adjust height as needed */}
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {num === 1 && (
                    <ul>
                      <li>Item 1: Value A</li>
                      <li>Item 2: Value B</li>
                    </ul>
                  )}
                  {num === 2 && <p>Total: 120</p>}
                  {num === 3 && <p>Status: Active</p>}
                  {num === 4 && <p>Percentage: 25%</p>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;