import React, { useState } from 'react';
import { FaUser, FaCog, FaBullhorn, FaList, FaChartLine, FaChartBar, FaFileInvoice, FaClock, FaFileAlt, FaBox, FaTachometerAlt, FaExclamationCircle, FaAngleDown } from 'react-icons/fa';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleCollapse = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCollapseNav = (id, items) => (
    <div className={`collapse ${openSections[id] ? 'show' : ''}`} id={id}>
      <nav className="sb-sidenav-menu-nested nav">
        {items.map((item, index) => (
          <button key={index} className="nav-link remove-btn-border" data-toggle="tab" id={item.id}>
            <i className="fas fa-circle fa-2xs m-2"></i>{item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu pt-4">
            <div className="nav">
              {/* User Management */}
              <a className="nav-link nav-link-collapse collapsed" href="#" onClick={() => toggleCollapse('collapseLayouts4')}>
                <div className="sb-nav-link-icon"><FaUser /></div>
                Configure User Management
                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
              </a>
              {renderCollapseNav('collapseLayouts4', [
                { id: 'accessLevelListBtn', label: 'Configure Access Level' },
                { id: 'departmentListBtn', label: 'Department' },
                { id: 'customAccessLevelListBtn', label: 'Custom Access Level' },
                { id: 'userListBtn', label: 'Users' },
                { id: 'userCustomAccessLevelListBtn', label: 'Custom Access Level User Mapping' },
              ])}

              {/* Sales Config Management */}
              <a className="nav-link nav-link-collapse collapsed" href="#" onClick={() => toggleCollapse('collapseLayouts2')}>
                <div className="sb-nav-link-icon"><FaCog /></div>
                Sales Config Management
                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
              </a>
              {renderCollapseNav('collapseLayouts2', [
                { id: 'confRegionBtn', label: 'Region' },
                { id: 'confPaymentTermsBtn', label: 'Payment terms' },
                { id: 'campaignTypeListBtn', label: 'Order Type/Tactics' },
              ])}

              {/* Dashboard */}
              <button className="nav-link remove-btn-border" id="dashboardBtn">
                <div className="sb-nav-link-icon"><i className="fas fa-dashboard"></i></div>Dashboard
              </button>

              {/* Sales Management */}
              <a className="nav-link nav-link-collapse collapsed" href="#" onClick={() => toggleCollapse('collapseLayouts1')}>
                <div className="sb-nav-link-icon"><FaBullhorn /></div>
                Sales Management
                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
              </a>
              {renderCollapseNav('collapseLayouts1', [
                { id: 'clientManagementBtn', label: 'Client Management' },
              ])}

              {/* Order Management */}
              <a className="nav-link nav-link-collapse collapsed" href="#" onClick={() => toggleCollapse('collapseLayouts3')}>
                <div className="sb-nav-link-icon"><FaList /></div>
                Order Management
                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
              </a>
              {renderCollapseNav('collapseLayouts3', [
                { id: 'orderBookingFormBtn', label: 'IO booking form' },
                { id: 'segmentListBtn', label: 'Segment List' },
                { id: 'DraftedIOsBtn', label: 'Draft IOs' },
                { id: 'DeletedIOsBtn', label: 'Deleted IOs' },
              ])}

              {/* Reports */}
              <button className="nav-link remove-btn-border" id="projectedRevRptBtn">
                <div className="sb-nav-link-icon"><FaChartLine /></div>Projected Revenue Report
              </button>
              <button className="nav-link remove-btn-border" id="salesSummaryReportBtn">
                <div className="sb-nav-link-icon"><FaChartBar /></div>Sales Summary Report
              </button>
              <button className="nav-link remove-btn-border" id="billedVsUnbilledReportBtn">
                <div className="sb-nav-link-icon"><FaFileInvoice /></div>Billed vs Unbilled Report
              </button>
              <button className="nav-link remove-btn-border" id="agingReportBtn">
                <div className="sb-nav-link-icon"><FaClock /></div>Aging Report
              </button>

              {/* Report Management */}
              <a className="nav-link nav-link-collapse collapsed" href="#" onClick={() => toggleCollapse('collapseLayoutsReport')}>
                <div className="sb-nav-link-icon"><FaFileAlt /></div>
                Report Management
                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
              </a>
              {renderCollapseNav('collapseLayoutsReport', [
                { id: 'salesReportBtn', label: 'Sales Report' },
                { id: 'RegionalVpReportBtn', label: 'Sales Manager Report' },
                { id: 'leadsCountReportBtn', label: 'Lead Count And CPL Overview Report' },
              ])}

              {/* Ops Management */}
              <button className="nav-link remove-btn-border" id="deliveryStatusOps">
                <div className="sb-nav-link-icon"><FaBox /></div>Delivery Status
              </button>
              <button className="nav-link remove-btn-border" id="pacingOps">
                <div className="sb-nav-link-icon"><FaTachometerAlt /></div>Pacing
              </button>
              <button className="nav-link remove-btn-border" id="missedDeliveriesOps">
                <div className="sb-nav-link-icon"><FaExclamationCircle /></div>Missed Deliveries
              </button>
            </div>
          </div>

          <div className="sb-sidenav-footer">
            <div className="small">
              <i className="fas fa-user fa-2x mr-1 ml-1"></i>
              <button type="button" className="remove-btn-border" style={{ fontSize: 14, color: '#ffc013' }}>
                &nbsp;Current Module
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
