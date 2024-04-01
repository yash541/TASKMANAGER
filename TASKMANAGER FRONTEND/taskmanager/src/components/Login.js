import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenExpiry,settokenExpiry]=useState(true);
  const handleLogin = async () => {
    settokenExpiry(false);
    try {
      // Prepare login data
      const loginData = {
        email,
        password,
      };

      // Make a request to your /login endpoint to authenticate user
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      // Assuming data contains access_token and refresh_token
      if (data.access_token && data.refresh_token) {
        // Set tokens in cookies
        document.cookie = `access_token=${data.access_token}; path=/`;
        document.cookie = `refresh_token=${data.refresh_token}; path=/`;
        // Redirect user to home page or dashboard
        setErrorMessage('');
        navigate('/landing');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className=''>Login</h1>
        <input
        className='inputlogin'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
        />
        <input
        className='inputlogin'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className='buttonlogin' onClick={handleLogin}>Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;