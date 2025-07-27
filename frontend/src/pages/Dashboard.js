import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';
import '../css/dashboard.css';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const Dashboard = () => {
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const financeRes = await fetch('https://mocki.io/v1/d5f1c2c7-099a-488c-83d6-bbcf8a656868');
        if (!financeRes.ok) throw new Error(`Finance chart HTTP error: ${financeRes.status}`);
        const financeJSON = await financeRes.json();

        const totals = {};
        financeJSON.data.forEach(entry => {
          for (const key in entry) {
            if (typeof entry[key] === 'number' && key !== 'fin_id') {
              totals[key] = (totals[key] || 0) + entry[key];
            }
          }
        });

        const transformedFinance = Object.entries(totals).map(([name, value]) => ({ name, value }));
        setFinanceData(transformedFinance);

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
                  <p>{error ? `Error fetching data: ${error.message}` : 'Loading dashboard data...'}</p>
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
          {/* Finance Pie Chart */}
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2 className="card-title">Finance Expense Breakdown</h2>
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
                      data={financeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#00C49F"
                      dataKey="value"
                      label={({ name, value }) => `${name.replace(/_/g, ' ')} (${value})`}
                    >
                      {financeData.map((entry, index) => (
                        <Cell key={`cell-fin-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;