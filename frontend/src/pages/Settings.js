import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoPublish: false,
    theme: 'light',
    timezone: 'UTC',
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button className="settings-nav-item active">Account</button>
            <button className="settings-nav-item">Notifications</button>
            <button className="settings-nav-item">Integrations</button>
            <button className="settings-nav-item">Billing</button>
            <button className="settings-nav-item">Privacy</button>
          </nav>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Account Settings</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" defaultValue="Burladean Anatolie" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                defaultValue="anatol.burladean@gmail.com"
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="username" defaultValue="anatolie" />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option>UTC</option>
                <option>EST</option>
                <option>CST</option>
                <option>MST</option>
                <option>PST</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Publishing Settings</h3>
            <div className="toggle-group">
              <div className="toggle-item">
                <div>
                  <label>Enable Notifications</label>
                  <p className="toggle-description">
                    Receive notifications about posts and comments
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div>
                  <label>Auto-Publish</label>
                  <p className="toggle-description">Automatically publish scheduled posts</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoPublish}
                    onChange={(e) => handleSettingChange('autoPublish', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Display Settings</h3>
            <div className="form-group">
              <label>Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="settings-section danger-zone">
            <h3>Danger Zone</h3>
            <button className="btn btn-danger">Delete Account</button>
            <p>Warning: This action cannot be undone.</p>
          </div>

          <div className="settings-actions">
            <button className="btn btn-primary">Save Changes</button>
            <button className="btn btn-secondary">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
