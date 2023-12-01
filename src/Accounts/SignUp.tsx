import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SignUpProps {
    onSignUp: (username: string, password: string, accountType: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');

  const handleSignUp = () => {
    // Validate the form data
    if (!username || !password || !accountType) {
      alert('Please fill in all fields');
      return;
    }

    // Perform the sign-up action
    onSignUp(username, password, accountType);
  };

  return (
    <div className='container registration-cont'>
      <h2> Welcome!</h2>
      <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label className="col-form-label" htmlFor="username">Username:</label>
        </div>
        <input
          type="text"
          id="username"
          className='form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
            <label className="col-form-label" htmlFor="password">Password:</label>
        </div>
        <input
          type="password"
          id="password"
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <i className="fa fa-eye-slash" id="togglePassword"></i>
        <div id="passwordHelpBlock" className="form-text">
           Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
            <label className='col-form-label' htmlFor="accountType">Account Type:</label>
        </div>
        <select
          id="accountType"
          className='form-control'  
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="" hidden>Select Account Type</option>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <Button className='form-control btn btn-primary sign-up' onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
