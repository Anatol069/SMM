import React, { useState } from 'react';
import './MediaLibrary.css';

function MediaLibrary() {
  // eslint-disable-next-line no-unused-vars
  const [media, setMedia] = useState([
    {
      id: 1,
      type: 'image',
      title: 'Sunset Photo',
      url: 'https://via.placeholder.com/200x200?text=Sunset',
    },
    {
      id: 2,
      type: 'image',
      title: 'Beach Day',
      url: 'https://via.placeholder.com/200x200?text=Beach',
    },
    {
      id: 3,
      type: 'video',
      title: 'Product Demo',
      url: 'https://via.placeholder.com/200x200?text=Video',
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [draggedFiles, setDraggedFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    setDraggedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="media-library-page">
      <div className="media-header">
        <h2>Media Library</h2>
        <div className="media-controls">
          <input type="text" className="search-input" placeholder="Search media..." />
          <button className="btn btn-primary">+ Upload</button>
        </div>
      </div>

      <div className="upload-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="upload-icon">📁</div>
        <h3>Drop Media Here to Upload</h3>
        <p>Then drag media to the Calendar to schedule posts.</p>
        <button className="btn btn-secondary">Select Files</button>
      </div>

      <div className="filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Images</button>
        <button className="filter-btn">Videos</button>
        <button className="filter-btn">Unused</button>
      </div>

      <div className="media-grid">
        {media.map((item) => (
          <div key={item.id} className="media-item">
            <div className="media-preview">
              <img src={item.url} alt={item.title} />
              <div className="media-overlay">
                <button className="btn-icon">👁️</button>
                <button className="btn-icon">✂️</button>
                <button className="btn-icon">🗑️</button>
              </div>
              {item.type === 'video' && <div className="video-badge">▶</div>}
            </div>
            <div className="media-info">
              <p className="media-title">{item.title}</p>
              <p className="media-date">Today</p>
            </div>
          </div>
        ))}
      </div>

      <div className="media-stats">
        <div className="stat">
          <div className="stat-value">{media.length}</div>
          <div className="stat-label">Total Files</div>
        </div>
        <div className="stat">
          <div className="stat-value">2.4</div>
          <div className="stat-label">GB Used</div>
        </div>
        <div className="stat">
          <div className="stat-value">7.6</div>
          <div className="stat-label">GB Available</div>
        </div>
      </div>
    </div>
  );
}

export default MediaLibrary;
