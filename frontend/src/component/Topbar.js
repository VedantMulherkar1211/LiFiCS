import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "react-feather";
import '../css/topbar.css';

export default function Topbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const scrollRef = useRef(null);

        // HIDE IF: On Login page
    if (location.pathname === "/login") return null;
    // Dynamic tabs - you can easily add all 10 here
    const tabs = [
        { label: "Dashboard", icon: "bi-grid-1x2", path: "/" },
        { label: "Health", icon: "bi-activity", path: "/health" },
        { label: "Finance", icon: "bi-cash", path: "/finance" },
        { label: "Career", icon: "bi-briefcase", path: "/carear" },
        { label: "Lifestyle", icon: "bi-house", path: "/lifestyle" },
        { label: "Learning", icon: "bi-book", path: "/learning" },
    ];

    return (
        <div className="fixed-top w-100 d-flex justify-content-center px-3" style={{ zIndex: 1030, pointerEvents: 'none', position: 'relative' }}>
            <div 
                ref={scrollRef}
                className="glass-dock d-flex align-items-center p-2 rounded-pill shadow-lg border"
                style={{ marginTop: '12px', pointerEvents: 'auto' }}
            >
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <button
                            key={tab.path}
                            onClick={() => navigate(tab.path)}
                            className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 border-0 flex-shrink-0 transition-all ${
                                isActive ? "bg-primary text-white shadow" : "text-secondary"
                            }`}
                        >
                            <i className={`bi ${tab.icon}`}></i>
                            <span className="fw-semibold small">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Profile Detail - Top Right */}
            <div className="profile-card d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ pointerEvents: 'auto' }}>
                <div className="profile-avatar">
                    <User size={20} />
                </div>
                <div className="profile-info">
                    <div className="profile-info-name">John Doe</div>
                    <div className="profile-info-email">john@example.com</div>
                </div>
            </div>
        </div>
    );
}