// src/components/MyModal.js
import React, {useState} from 'react';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddUser from './AddUser';
interface MyModalProps extends ModalProps {
    show: boolean;
    handleClose: () => void;
  }
const Modal: React.FC<MyModalProps> = ({ show, handleClose }) => {
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');
    const [password, setPassword] = useState('');
    const [handleClear, sethandleClear] = useState(false);
    return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title><i className='bi bi-person'></i> Add New User </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <AddUser clear={handleClear}/>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={(e) => sethandleClear(true)}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
