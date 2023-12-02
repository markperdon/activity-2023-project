import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from './shared/Modal';

const Home = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Check if the user is authenticated (you can implement a more secure check)
    const isAuthenticated = !!storedUser.username;

    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    }

    setAuthenticated(isAuthenticated);
  }, [navigate, storedUser]);

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('user');
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
              <Nav.Item className="mr-2 light"><Button variant="outline-success btn-sm"> <i className="bi bi-eyeglasses"></i>{storedUser.accountType}</Button>!</Nav.Item>
                <Button variant="light outline-primary btn-sm" onClick={handleLogout}>
                  Sign out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container-fluid mt-5">
            <h2>Welcome, {storedUser.username}!</h2>
            <Button variant="primary btn-sm" onClick={handleShow}>
                <i className="bi bi-person-add"></i>
                Add New User                  
            </Button>
            <div className="table-responsive small">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Branch ID,</th>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>random</td>
                    <td>data</td>
                    <td>placeholder</td>
                    <td>text</td>
                  </tr>
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
