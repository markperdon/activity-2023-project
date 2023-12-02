import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import { onSignUp } from '../api/auth';
import '../css/App.css'


const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleSignUp = async () => {
    // Validate the form data
    if (!username || !password || !accountType) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Call the onSignUp function to register the user
      await onSignUp(username, password, accountType);

      // Redirect or perform other actions upon successful sign-up
      navigate('/home');
      console.log('User successfully registered!');
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container registration-cont App">
      <h2>Register to Start.</h2>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label" htmlFor="username">
            Username:
          </label>
        </div>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label" htmlFor="password">
            Password:
          </label>
        </div>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="passwordHelpBlock" className="form-text">
          Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label" htmlFor="accountType">
            Account Type:
          </label>
        </div>
        <select
          id="accountType"
          className="form-control"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="" hidden>
            Select Account Type
          </option>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <Button className="form-control btn btn-primary sign-up" onClick={handleSignUp}>
        Sign Up
      </Button>
      Already have an account? <a href="/login">Log In here</a>

    </div>
  );
};

export default SignUp;