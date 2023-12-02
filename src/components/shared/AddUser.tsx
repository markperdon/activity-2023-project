// src/components/MyModal.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';
import { onSignUp } from '../../api/auth';
import { hasNumber, hasSymbol, isPassLong } from './global';

interface AddUserProps extends ModalProps {
    show: boolean;
    handleClose: () => void;
    getUsers: () => void;
  }
const AddUser: React.FC<AddUserProps> = ({ show, handleClose, getUsers }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [branchID, setBranchID] = useState('');
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
        },1500);
        return;
      }

      try {
        // Call the onSignUp function to register the user
        await onSignUp(username, password, accountType);
        handleClose();
        getUsers();
        handleClear();
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
    const handleClear = () => {
    setUsername('');
    setPassword('');
    setAccountType('');
    }

   return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title><i className='bi bi-person'></i> Add New User </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
      <>  <div className="row g-3 align-items-center">
          {message && <div className={`alert alert-${message === "Success!" ? 'success' : 'warning'}`} role="alert">
            {message}
          </div>}
            </div>
            <div className="row g-3 align-items-center mt-3">
              <div className="input-group mb-3">
                <select
                    id="accountType"
                    className="form-control"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                >
                    <option value="" disabled>
                        Select Account Type
                    </option>
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="row g-3 align-items-center">
            <div className="input-group mb-3">
            <input
              type="text"
              id="username"
              className="form-control"
              value={branchID}
              placeholder='Branch ID'
              onChange={(e) => setBranchID(e.target.value)}
              autoFocus
            />
            <span className="input-group-text">
              <i className="bi bi-building"></i>
            </span>
            </div>
            </div>
            <div className="row g-3 align-items-center">
            <div className="input-group mb-3">
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            </div>
          </div>
            <div className="row g-3 align-items-center">
            <div className="col-auto">
            </div>
            <div className="input-group mb-3">
            <input
              type={showPass ? 'password' : 'text'}
              id="password"
              placeholder='Password'
              className="form-control"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <span className="input-group-text show-pass" title='show password'
              onClick={() => setShowPass(showPass ? false : true)}>
              <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
            </div>
            <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
        </div>
        </>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={(e) => handleClear()}>
          Clear
        </Button>
        <Button variant="primary" disabled={!continueSignUp} onClick={handleSignUp}>
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default AddUser;
