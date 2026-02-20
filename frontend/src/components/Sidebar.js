import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/media', icon: '🖼️', label: 'Media' },
    { path: '/inbox', icon: '📬', label: 'Social Inbox' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
  ];

  const footerItems = [
    { path: '/settings', icon: '⚙️', label: 'Settings' },
    { path: '/help', icon: '❓', label: 'Help' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">SMM</span>
          <span className="logo-text">Social Manager</span>
        </div>
      </div>

      <nav className="nav-container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-section">
        <h3 className="section-title">Accounts</h3>
        <div className="account-selector">
          <div className="account-item">
            <div className="account-avatar">MG</div>
            <div className="account-info">
              <div className="account-name">Main Group</div>
              <div className="account-desc">0 Profiles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <ul className="nav-list">
          {footerItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
