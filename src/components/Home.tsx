import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from './shared/Modal';
import axios from 'axios';
import e from 'express';

interface User {
  id: number;
  username: string;
  accountType: string;
}
const Home = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const accountType = localStorage.getItem('accountType');
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [usersList, setUsersList] = useState<User[] | null>(null);

  useEffect(() => {
    // Check if the user is authenticated (you can implement a more secure check)
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    }
    getUsers();
    setAuthenticated(isAuthenticated);

  }, [navigate, token]);
  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:5000/users');
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <div>
      {authenticated ? (
        <div>
          <Navbar bg="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" expand="lg">
            <Navbar.Brand>Accounting StartUP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
              <Nav className="justify-content-end">
                <Button variant="secondary outline-primary btn-sm" onClick={handleLogout}>
                  Sign out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container-fluid mt-5">

            <div className="alert alert-secondary" role="alert">
            <h2>Welcome, {username}! <button type="button" className="btn btn-outline-success" disabled>{accountType}</button> </h2></div>
            <Button variant="primary btn-sm" onClick={handleShow}>
                <i className="bi bi-person-add"></i>
                Add New User
            </Button>
            <div className="table-responsive small tbl-users">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Branch ID,</th>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    {accountType === 'admin' && <th scope="col">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {usersList && usersList.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.username}</td>
                        <td>{user.accountType}</td>
                        {accountType === 'admin' && <td><Button className='btn btn-danger'><i className='bi bi-person-dash'/></Button></td>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    <Modal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Home;
