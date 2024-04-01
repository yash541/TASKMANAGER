import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Taskmanager</h1>
        <p className="home-tagline">Manage your tasks like never before</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button">Login</Link>
          <Link to="/register" className="home-button">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;