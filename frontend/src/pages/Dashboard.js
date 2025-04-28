import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../component/Topbar'; // Adjust the import path if necessary
import SideNav from '../component/Sidebar'; // Adjust the import path if necessary
import '../css/dashboard.css'; // You'll need to create this CSS file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-content">
        <SideNav />
        <div className="main-dashboard-area">
          <div className="salesDiv m-4" id="dashboardDiv">
            <div className="tab-content">
              <div className="row m-4 align-items-center">
                <div className="col-md-6">
                  <h6>Dashboard</h6>
                  <span id="financialYearDisplay"></span> {/* Data will be displayed here */}
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                  <button
                    type="button"
                    className="btn border border-secondary btn-light m-1 d-flex align-items-center"
                    data-toggle="tooltip"
                    title="Download Sales Report"
                    onClick={() => {
                      // Implement your getSalesReportMonthlyOnDashboard logic here
                      console.log('Export Sales Report clicked');
                    }}
                  >
                    <FontAwesomeIcon icon={faShare} /> Export Sales Report
                  </button>
                  <button
                    className="btn border border-secondary btn-light"
                    onClick={() => {
                      // Implement your openSetTargetForm logic here
                      console.log('Set Targets clicked');
                      // You'd likely open a modal here using state
                    }}
                  >
                    <FontAwesomeIcon icon={faBullseye} /> Set Targets
                  </button>
                  <div className="form-group m-1">
                    <select
                      className="form-select btn border border-secondary btn-light"
                      id="financialYearSelect"
                      onChange={(e) => {
                        // Implement your setFinancialYear logic here
                        console.log('Financial Year selected:', e.target.value);
                      }}
                    >
                      {/* Options will be dynamically rendered here */}
                    </select>
                  </div>
                </div>
              </div>
              <div id="dashboardDivTab" className="tab-pane active" role="tabpanel">
                <div className="container-fluid text-center">
                  <div className="row mx-auto my-auto">
                    <div id="recipeCarousel" className="carousel slide w-100">
                      <div className="carousel-inner w-100" role="listbox" id="regionCards">
                        <div className="row">
                          {/* These would be dynamically generated Region Cards */}
                          <div className="col-md-3">
                            <DashboardCard />
                          </div>
                          <div className="col-md-3">
                            <DashboardCard />
                          </div>
                          <div className="col-md-3">
                            <DashboardCard />
                          </div>
                          <div className="col-md-3">
                            <DashboardCard />
                          </div>
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev w-auto"
                        href="#recipeCarousel"
                        role="button"
                        data-slide="prev"
                      >
                        <span className="arrow previous hexagon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next w-auto"
                        href="#recipeCarousel"
                        role="button"
                        data-slide="next"
                      >
                        <span className="arrow next hexagon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="d-flex flex-column dashboard-card" id="targetToRegionCards">
                          {/* Target to Region Cards will be rendered here */}
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-8">
                            <div
                              className="container dashboard-card bg-white card-with-shadow p-3"
                              style={{ height: '360px' }}
                            >
                              <div className="echarts-container pb-3">
                                <div className="echarts-heading">Aging Report</div>
                                <div className="echarts-download">
                                  <button
                                    onClick={() => {
                                      // Implement your getAgingReport logic here
                                      console.log('Download Aging Report clicked');
                                    }}
                                    title="Download Aging Report"
                                  >
                                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                                  </button>
                                </div>
                              </div>
                              <div className="table-container">
                                <div className="table-responsive Table-Dragable ">
                                  <table className="table table-striped table-hover">
                                    <thead>
                                      <tr>
                                        <th scope="col" className="text-left">
                                          Client
                                        </th>
                                        <th scope="col" className="text-center">
                                          0-30 DAYS
                                        </th>
                                        <th scope="col" className="text-center">
                                          30-60 DAYS
                                        </th>
                                        <th scope="col" className="text-center">
                                          60-90 DAYS
                                        </th>
                                        <th scope="col" className="text-center">
                                          90-120 DAYS
                                        </th>
                                        <th scope="col" className="text-center">
                                          &gt;120 DAYS
                                        </th>
                                        <th scope="col" className="text-center">
                                          BALANCE
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody id="agingReportTable">
                                      {/* Aging Report data will be rendered here */}
                                      <tr>
                                        <th scope="col" className="text-left">
                                          -
                                        </th>
                                        <td className="value text-center"> - </td>
                                        <td className="value text-center"> - </td>
                                        <td className="value text-center"> - </td>
                                        <td className="value text-center"> - </td>
                                        <td className="value text-center"> - </td>
                                        <td className="value text-center"> - </td>
                                      </tr>
                                      {/* ... more rows ... */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4" id="donatChartDiv">
                            <div className="echarts-download pt-3 pr-3" style={{ zIndex: 99 }}>
                              <button
                                onClick={() => {
                                  // Implement your getBilledUnbilledReportToAll logic here
                                  console.log('Download Billed VS UnBilled Report clicked');
                                }}
                                title="Download Billed VS UnBilled Report"
                              >
                                <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                              </button>
                            </div>
                            <div id="pieChartCanvas" className="dashboard-item1 dashboard-card card-with-shadow">
                              {/* Billed vs Unbilled Pie Chart will be rendered here */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4" id="donatChartDiv">
                    <div className="echarts-download pt-3 pr-4" style={{ zIndex: 99 }}>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#donatChartModel"
                        onClick={() => {
                          // You'd likely control the modal's visibility using React state
                          console.log('Expand Donat Chart clicked');
                        }}
                      >
                        <FontAwesomeIcon icon={faExpand} aria-hidden="true" title="Show Donat Chart For All Clients" />
                      </button>
                    </div>
                    {/* Modal */}
                    <div className="modal fade" id="donatChartModel" tabIndex="-1" role="dialog" aria-labelledby="donatChartModelTitle" aria-hidden="true">
                      <div className="modal-lg modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div id="AllClientsDonatChartCanvas" className="chartOnModel dashboard-card">
                              {/* Donat Chart for All Clients in Modal */}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="donatChartCanvas" className="dashboard-item1 dashboard-card card-with-shadow">
                      {/* Individual Donat Chart will be rendered here */}
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="container dashboard-card bg-white p-3">
                      <div className="echarts-container pb-3">
                        <div className="echarts-heading">Projected Revenue</div>
                        <div className="echarts-download">
                          {/* Conditional rendering based on access level (you'd handle this in React state/context) */}
                          <button
                            onClick={() => {
                              // Implement your downloadprojectedRev logic here
                              console.log('Download Projected Revenue Report clicked');
                            }}
                            title="Download Projected Revenue Report"
                          >
                            <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="table-container">
                        <div className="table-responsive Table-Dragable ">
                          <table className="table tbl-font table-striped table-hover">
                            <thead>
                              <tr>
                                <th scope="col" className="text-left">
                                  Client
                                </th>
                                <th scope="col" className="text-center">
                                  Apr
                                </th>
                                <th scope="col" className="text-center">
                                  May
                                </th>
                                <th scope="col" className="text-center">
                                  June
                                </th>
                                <th scope="col" className="text-center">
                                  July
                                </th>
                                <th scope="col" className="text-center">
                                  Aug
                                </th>
                                <th scope="col" className="text-center">
                                  Sep
                                </th>
                                <th scope="col" className="text-center">
                                  Oct
                                </th>
                                <th scope="col" className="text-center">
                                  Nov
                                </th>
                                <th scope="col" className="text-center">
                                  Dec
                                </th>
                                <th scope="col" className="text-center">
                                  Jan
                                </th>
                                <th scope="col" className="text-center">
                                  Feb
                                </th>
                                <th scope="col" className="text-center">
                                  Mar
                                </th>
                              </tr>
                            </thead>
                            <tbody id="projectedRevTable">
                              {/* Projected Revenue data will be rendered here */}
                              <tr>
                                <th scope="col" className="text-left">
                                  -
                                </th>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                                <td className="value text-center"> - </td>
                              </tr>
                              {/* ... more rows ... */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Set Target Modal */}
          <div className="modal fade" id="setTargetModal" tabIndex="-1" role="dialog" aria-labelledby="setTargetModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title" id="setTargetModalLabel">
                    Set Region-Wise Targets
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form id="targetForm">
                    <div className="row g-3" id="regionCardContainer">
                      {/* Region target cards will be dynamically rendered here */}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Implement your saveTargets logic here
                      console.log('Set Targets button in modal clicked');
                    }}
                    className="btn btn-success"
                  >
                    Set Targets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for the individual dashboard cards in the carousel
function DashboardCard() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-body">
        <table className="table table-striped table-hover text-left m-0">
          <tbody>
            <tr>
              <th className="dashboard-header text-center p-2 border-0" colSpan="2">
                <div className="echarts-container">
                  <div>-</div> {/* Placeholder for chart */}
                </div>
              </th>
            </tr>
            <tr>
              <th className="py-2">Booked:</th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">
                Booked<span style={{ fontSize: 'smaller' }} title="Excluded Tactics">(Excl. Tactics)</span>:
              </th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">Billed:</th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">UnBilled:</th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">Paid:</th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">Lead Booked:</th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">
                Lead Booked<span style={{ fontSize: 'smaller' }} title="Excluded Tactics">(Excl. Tactics)</span>:
              </th>
              <td className="value py-2">-</td>
            </tr>
            <tr>
              <th className="py-2">Average CPL:</th>
              <td className="value py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;