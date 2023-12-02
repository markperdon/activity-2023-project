import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { onSignUp } from '../api/auth';
import '../css/App.css';
import { hasNumber, hasSymbol, isPassLong } from './shared/global';


const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passHasNumber, setPassHasNumber] = useState(false);
  const [passHasSymbol, setPassHasSymbol] = useState(false);
  const [continueSignUp, setContinueSignUp] = useState(false);
  const [passLong, setPassLong] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    // Validate the form data
    if (!username || !password || !accountType) {
      setMessage('Please fill in all fields');
      setTimeout(() => {
        setMessage('');
      },2000);
      return;
    }

    try {
      setContinueSignUp(false);
      // Call the onSignUp function to register the user
      await onSignUp(username, password, accountType);
      setMessage("Success!")
      // Redirect or perform other actions upon successful sign-up
      setTimeout(() => {
        navigate('/home');
      },2000);
      console.log('User successfully registered!');
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
    }
  };
  useEffect(() => {
    setPassHasNumber(hasNumber(password))
    setPassHasSymbol(hasSymbol(password))
    setPassLong(isPassLong(password))
  }, [password])

  const setPass = (pass: string) => {
    setPassword(pass);
    if(passHasNumber && passHasSymbol && passLong){
      setContinueSignUp(true);
    }
  }

  return (
    <div className="container registration-cont App">
      <h2>Register to Start.</h2>
      {message && <div className={`alert alert-${message === "Success!" ? 'success' : 'warning'}`} role="alert">
        {message}
      </div>}
      <div className="row g-3 align-items-center mt-3 mb-2">
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

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label" htmlFor="username">
            Username:
          </label>
        </div>
        <div className="input-group mb-3">
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <span className="input-group-text">
          <i className="bi bi-person"></i>
        </span>
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label" htmlFor="password">
            Password:
          </label>
        </div>
        <div className="input-group mb-3">
        <input
          type={!showPass ? 'password' : 'text'}
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        <span className="input-group-text show-pass" title='show password'
          onClick={() => setShowPass(showPass ? false : true)}>
          <i className={`bi ${!showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
        </span>
        </div>
      </div>
      <div id="passwordHelpBlock" className="form-text">
          Your password must be 8-20 characters long {passLong &&  <i className="bi bi-check-circle text-success"></i>}, contain letters and numbers {passHasNumber &&  <i className="bi bi-check-circle text-success"></i>}, and has at one special characters. {passHasSymbol &&  <i className="bi bi-check-circle text-success"></i>}
      </div>

      <Button className="form-control btn btn-primary sign-up" onClick={handleSignUp} disabled={!continueSignUp}>
        Sign Up
      </Button>
      <div className='reg-link'>Already have an account? <a href="/login">Log In here</a></div>

    </div>
  );
};

export default SignUp;