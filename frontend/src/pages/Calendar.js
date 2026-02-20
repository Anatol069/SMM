import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 20));
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === 20 && selectedDate.getMonth() === 1;
      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? 'today' : ''}`}
          onClick={() =>
            setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
          }
        >
          <div className="day-number">{i}</div>
          <div className="day-posts">
            {posts
              .filter((p) => p.date === i)
              .map((p) => (
                <div key={p.id} className={`post-badge ${p.platform}`}>
                  {p.platform.slice(0, 2)}
                </div>
              ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>Content Calendar</h2>
        <button className="btn btn-primary" onClick={() => setShowPostForm(!showPostForm)}>
          + New Post
        </button>
      </div>

      {showPostForm && (
        <div className="post-form-container">
          <div className="post-form">
            <h3>Schedule New Post</h3>
            <div className="form-group">
              <label>Caption</label>
              <textarea placeholder="Write your caption..."></textarea>
            </div>
            <div className="form-group">
              <label>Platform</label>
              <select>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Twitter</option>
                <option>TikTok</option>
                <option>LinkedIn</option>
              </select>
            </div>
            <div className="form-group">
              <label>Schedule Date & Time</label>
              <input type="datetime-local" />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">Schedule</button>
              <button className="btn btn-secondary" onClick={() => setShowPostForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="calendar-wrapper">
        <div className="calendar-nav">
          <button onClick={prevMonth} className="btn-nav">
            ←
          </button>
          <h3 className="month-year">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={nextMonth} className="btn-nav">
            →
          </button>
        </div>

        <div className="calendar">
          <div className="weekday-header">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-grid">{renderDays()}</div>
        </div>
      </div>

      <div className="profiles-section">
        <h3>Social Profiles</h3>
        <div className="profiles-grid">
          <div className="profile-card add-profile">
            <div className="profile-icon">+</div>
            <p>Add Profile</p>
          </div>
          <div className="profile-card">
            <div className="profile-avatar ig">📷</div>
            <div className="profile-info">
              <div className="profile-name">Instagram</div>
              <div className="profile-handle">@yourhandle</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
