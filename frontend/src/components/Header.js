import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header({ onMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="page-title">Calendar</h1>
      </div>
      <div className="header-right">
        <button className="btn-icon">🔔</button>
        <button className="btn-icon">⚙️</button>
        <div className="user-menu">
          <button
            className="user-avatar-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            title={user?.name}
          >
            <span className="avatar-circle">{user?.name?.charAt(0).toUpperCase()}</span>
          </button>
          {showUserMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="user-name">{user?.name}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              <hr />
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/settings');
                  setShowUserMenu(false);
                }}
              >
                Settings
              </button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
