// src/components/MyModal.js
import React, {useState} from 'react';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { onSignUp } from '../../api/auth';

interface AddUserProps extends ModalProps {
    show: boolean;
    handleClose: () => void;
    getUsers: () => void;
  }
const AddUser: React.FC<AddUserProps> = ({ show, handleClose, getUsers }) => {
    // const [handleClear, sethandleClear] = useState(false);
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = async () => {
      // Validate the form data
      if (!username || !password || !accountType) {
        alert('Please fill in all fields');
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
      <><div className="row g-3 align-items-center">
            <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                autoFocus />
                </div><div className="row g-3 align-items-center">
                <div className="col-auto">
                </div>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div><div className="row g-3 align-items-center">
                <div className="col-auto">
                </div>
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
            </div></>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={(e) => handleClear()}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleSignUp}>
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default AddUser;
