import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import MediaLibrary from './pages/MediaLibrary';
import SocialInbox from './pages/SocialInbox';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app">
                  {sidebarOpen && <Sidebar />}
                  <div className="main-content">
                    <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                    <div className="content">
                      <Routes>
                        <Route path="/" element={<Calendar />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/media" element={<MediaLibrary />} />
                        <Route path="/inbox" element={<SocialInbox />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
