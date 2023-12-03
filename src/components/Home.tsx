import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import $ from "jquery";
import { useNavigate } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import AddUser from './shared/AddUser';
import { titlizeText } from './shared/global';

interface User {
  id: number;
  branchId: string;
  username: string;
  accountType: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const accountType = localStorage.getItem('accountType');
  const branchId = localStorage.getItem('branchId');
  const userId = localStorage.getItem('userId');

  const [showModal, setShowModal] = useState<boolean>(branchId === '');
  const [usersList, setUsersList] = useState<User[] | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = !!token;

      if (!isAuthenticated) {
        navigate('/login');
      } else {
        getUsers();
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [navigate, token]);

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:5000/users/all');
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (response.data.success) {
        const updatedUsers = usersList && usersList.filter((user) => user.id !== userId);
        setUsersList(updatedUsers);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting user');
    }
  };

  const toggleConfirmation = (userId: number, show: boolean) => {
    $(`#confirm${userId}, #back${userId}, #lbl-del${userId}`).toggle(100);
    $(`#del${userId}`).toggle(100);
  };

  const handleConfirm = (userId: number) => {
    toggleConfirmation(userId, true);
  };

  const handleBack = (userId: number) => {
    toggleConfirmation(userId, false);
  };

  return authenticated ? (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Accounting StartUP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Button variant="secondary outline-primary btn-sm" onClick={handleLogout}>
              Sign out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid mt-5">
        <div className="alert alert-light" role="alert">
          <h2>
            Welcome, {username && titlizeText(username)}!{' '}
            <button type="button" className="btn btn-outline-success" disabled>
              {accountType}
            </button>
          </h2>
        </div>
        {accountType === 'admin' && (
          <Button variant="primary btn-sm" onClick={() => setShowModal(true)}>
            <span className="bi bi-person-add"></span> &nbsp; Add New User
          </Button>
        )}
        <div className="table-responsive small tbl-users">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Branch ID</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                {accountType === 'admin' && <th scope="col">Action</th>}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((user) => (
                <tr key={user.id}>
                  <td>{user.branchId}</td>
                  <td>{titlizeText(user.username)}</td>
                  <td>{titlizeText(user.username)}</td>
                  <td>{user.accountType}</td>
                  {accountType === 'admin' && (
                    <td>
                      <span className="confirm-btn" id={`lbl-del${user.id}`}>
                        Delete?
                      </span>
                      <Button className="btn btn-danger" id={`del${user.id}`} onClick={() => handleConfirm(user.id)}>
                        <i className="bi bi-person-dash" />
                      </Button>
                    </td>
                  )}
                  <td>
                    <Button className="btn btn-warning confirm-btn" id={`confirm${user.id}`} onClick={() => handleDelete(user.id)}>
                      <i className="bi bi-check-circle-fill" /> Yes
                    </Button>{' '}
                    &nbsp;
                    <Button className="btn btn-success back-btn" id={`back${user.id}`} onClick={() => handleBack(user.id)}>
                      <i className="bi bi-arrow-counterclockwise" /> No
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUser
        show={showModal}
        userName={username}
        branchId={branchId}
        currentAccountType={accountType}
        handleClose={() => setShowModal(false)}
        getUsers={getUsers}
        userId={userId}
      />
    </div>
  ) : (
    <p>Redirecting to login...</p>
  );
};

export default Home;
