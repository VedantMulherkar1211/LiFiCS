import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import Topbar from '../component/Topbar';
import Sidebar from '../component/Sidebar';
import { SidebarContext } from '../context/SidebarContext';
import '../css/dashboard.css';


const Finance = () => {
  const { isSidebarCollapsed } = useContext(SidebarContext);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://mocki.io/v1/c35e0af6-fc33-46ab-8b37-b156c22c9b2a'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        setApiData(data);

        // Extract available years
        if (data.data && Array.isArray(data.data)) {
          const years = data.data.map(item => item.year).sort((a, b) => b - a);
          setAvailableYears(years);
          // Set default to first year
          if (years.length > 0) {
            setSelectedYear(years[0]);
          }
        }

        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching finance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const MONTH_ORDER = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const CATEGORY_ORDER = [
    'rent',
    'breakfast',
    'lunch',
    'snacks',
    'dinner',
    'groceries',
    'ticket',
    'fuel',
    'vehicle',
    'stationary',
    'online_order',
    'travelling',
    'beverages',
    'pharma',
    'mobile_recharge',
    'other',
    'exam_fees',
  ];

  // Transform data for selected year into pivot table
  const transformToPivotTable = () => {
    if (!apiData || !selectedYear) {
      return { categories: [], months: MONTH_ORDER, tableData: [] };
    }

    const yearData = apiData.data.find(item => item.year === selectedYear);
    if (!yearData) {
      return { categories: [], months: MONTH_ORDER, tableData: [] };
    }

    const categoriesSet = new Set();
    yearData.months.forEach(monthData => {
      Object.keys(monthData.categories).forEach(cat => {
        categoriesSet.add(cat);
      });
    });

    const categories = CATEGORY_ORDER.filter(cat => categoriesSet.has(cat));
    const monthDataByName = Object.fromEntries(
      yearData.months.map(monthData => [monthData.month, monthData])
    );

    const tableData = categories.map(category => {
      const row = { category };
      let categoryTotal = 0;

      MONTH_ORDER.forEach(month => {
        const monthData = monthDataByName[month];
        const value = monthData?.categories?.[category] ?? 0;
        row[month] = Number(value) || 0;
        categoryTotal += Number(value) || 0;
      });

      row.total = categoryTotal;
      return row;
    });

    const totalRow = { category: 'Total' };
    let grandTotal = 0;

    MONTH_ORDER.forEach(month => {
      const monthData = monthDataByName[month];
      const monthTotal = Number(monthData?.total) || 0;
      totalRow[month] = monthTotal;
      grandTotal += monthTotal;
    });

    totalRow.total = grandTotal;
    tableData.push(totalRow);

    return { categories, months: MONTH_ORDER, tableData };
  };

  const { categories, months, tableData } = transformToPivotTable();

  if (loading) {
    return (
      <div className="dashboard-container">
        <Topbar />
        <div className="dashboard-wrapper">
          <Sidebar />
          <main className={`dashboard-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="card-row">
              <div className="full-width-card card">
                <p>Loading finance data...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Topbar />
        <div className="dashboard-wrapper">
          <Sidebar />
          <main className={`dashboard-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="card-row">
              <div className="full-width-card card">
                <p style={{ color: 'red' }}>Error loading data: {error}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Topbar />
      <div className="dashboard-wrapper">
        <Sidebar />
        <main className={`dashboard-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2 className="card-title">Finance Summary</h2>
                <div className="card-actions">
                  <FontAwesomeIcon icon={faShare} />
                  <FontAwesomeIcon icon={faBullseye} />
                  <FontAwesomeIcon icon={faDownload} />
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </div>

              {/* Year Filter */}
              {availableYears.length > 0 && (
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee' }}>
                  <label style={{ marginRight: '10px', fontWeight: '600' }}>Select Year:</label>
                  <select
                    value={selectedYear || ''}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      backgroundColor: '#fff',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Data Table */}
              <div style={{ overflowX: 'auto', padding: '20px' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#2c5f2d', color: 'white' }}>
                      <th
                        style={{
                          padding: '10px',
                          textAlign: 'left',
                          fontWeight: 'bold',
                          borderRight: '1px solid #ddd',
                          minWidth: '150px',
                        }}
                      >
                        Category
                      </th>
                      {months.map((month) => (
                        <th
                          key={month}
                          style={{
                            padding: '10px',
                            textAlign: 'right',
                            fontWeight: 'bold',
                            borderRight: '1px solid #ddd',
                            minWidth: '90px',
                          }}
                        >
                          {month}
                        </th>
                      ))}
                      <th
                        style={{
                          padding: '10px',
                          textAlign: 'right',
                          fontWeight: 'bold',
                          minWidth: '90px',
                        }}
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((row, index) => {
                        const isTotal = row.category === 'Total';
                        return (
                          <tr
                            key={index}
                            style={{
                              backgroundColor: isTotal ? '#d4edda' : index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                              borderBottom: isTotal ? '2px solid #2c5f2d' : '1px solid #eee',
                              fontWeight: isTotal ? 'bold' : 'normal',
                            }}
                          >
                            <td
                              style={{
                                padding: '10px',
                                textAlign: 'left',
                                borderRight: '1px solid #ddd',
                                backgroundColor: isTotal ? '#c3e6c5' : 'inherit',
                                textTransform: 'capitalize',
                              }}
                            >
                              {row.category.replace(/_/g, ' ')}
                            </td>
                            {months.map((month) => {
                              const value = row[month] || 0;
                              let bgColor = '#ffffff';

                              if (!isTotal) {
                                if (value > 5000) {
                                  bgColor = '#ffcccc';
                                } else if (value > 2000) {
                                  bgColor = '#ffe6cc';
                                } else if (value > 0) {
                                  bgColor = '#e6f7ff';
                                }
                              }

                              return (
                                <td
                                  key={month}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    borderRight: '1px solid #ddd',
                                    backgroundColor: isTotal ? '#c3e6c5' : bgColor,
                                  }}
                                >
                                  {value > 0 ? `₹ ${value.toFixed(2)}` : '-'}
                                </td>
                              );
                            })}
                            <td
                              style={{
                                padding: '10px',
                                textAlign: 'right',
                                backgroundColor: isTotal ? '#c3e6c5' : '#e6f7ff',
                                fontWeight: 'bold',
                              }}
                            >
                              ₹ {row.total.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={months.length + 2}
                          style={{ padding: '20px', textAlign: 'center', color: '#666' }}
                        >
                          No data available for the selected year.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Finance;


