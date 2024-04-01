import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutPage.css'; // Import your CSS file for styling

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

  return (
    <div className="logout-container">
        <h2>Glad to have you on board...</h2>
      <div className="message">
        <h2>Hope you had a great time using Taskmanager! See you soon.</h2>
      </div>
      <button className="login-button" onClick={handleLoginClick}>Login</button>
    </div>
  );
}

export default LogoutPage;
