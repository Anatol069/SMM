import React, { useState } from 'react';
import './Analytics.css';

function Analytics() {
  const [timeframe, setTimeframe] = useState('week');

  const stats = [
    { icon: '👥', label: 'Total Followers', value: '12,486', change: '+2.5%' },
    { icon: '❤️', label: 'Total Engagements', value: '8,394', change: '+8.2%' },
    { icon: '💬', label: 'Total Comments', value: '2,156', change: '+5.1%' },
    { icon: '🔄', label: 'Total Shares', value: '1,842', change: '+12.3%' },
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h2>Analytics</h2>
        <div className="timeframe-selector">
          {['day', 'week', 'month', 'year'].map((period) => (
            <button
              key={period}
              className={`timeframe-btn ${timeframe === period ? 'active' : ''}`}
              onClick={() => setTimeframe(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Engagement Over Time</h3>
          <div className="chart-placeholder">
            <svg viewBox="0 0 400 200" className="mini-chart">
              <polyline
                points="10,180 50,140 90,160 130,100 170,120 210,80 250,95 290,50 330,70 370,30"
                fill="none"
                stroke="#1976d2"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="chart-card">
          <h3>Top Posts</h3>
          <div className="top-posts">
            {[1, 2, 3].map((i) => (
              <div key={i} className="post-row">
                <div className="post-thumb">📷</div>
                <div className="post-details">
                  <div className="post-name">Post #{i}</div>
                  <div className="post-engagement">2.4K engagements</div>
                </div>
                <div className="post-metric">1,240</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="audience-section">
        <h3>Audience Insights</h3>
        <div className="audience-grid">
          <div className="audience-card">
            <div className="audience-header">
              <h4>Top Platforms</h4>
            </div>
            <div className="platform-list">
              {[
                { name: 'Instagram', followers: 8240, percentage: 66 },
                { name: 'TikTok', followers: 2840, percentage: 23 },
                { name: 'Facebook', followers: 1406, percentage: 11 },
              ].map((platform, idx) => (
                <div key={idx} className="platform-item">
                  <div className="platform-info">
                    <span className="platform-name">{platform.name}</span>
                    <span className="platform-followers">{platform.followers}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${platform.percentage}%` }}></div>
                  </div>
                  <span className="percentage">{platform.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-header">
              <h4>Audience Demographics</h4>
            </div>
            <div className="demographics">
              <div className="demo-item">
                <span>Age 18-24</span>
                <div className="demo-bar">
                  <div style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="demo-item">
                <span>Age 25-34</span>
                <div className="demo-bar">
                  <div style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="demo-item">
                <span>Age 35+</span>
                <div className="demo-bar">
                  <div style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
