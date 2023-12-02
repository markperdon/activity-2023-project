// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Validate the form data
      if (!userName || !password) {
        alert('Please fill in all fields');
        return;
      }

      // Make a request to log in the user
      const response = await axios.post('http://localhost:5000/login', { userName, password });

      // Extract the authentication token from the response
      const { token, username, accounttype } = response.data;

      // Save the token in localStorage
      localStorage.setItem('token', token);

      localStorage.setItem('username', username);
      localStorage.setItem('accountType', accounttype);

      // Navigate to the home page after login
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container login-cont ">
      <h2 className='App'>Login</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      Don't have an account? <a href="/signup">Register here</a>
    </div>
  );
};

export default Login;
