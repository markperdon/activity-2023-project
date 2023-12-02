import axios from 'axios';
import $ from "jquery";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import AddUser from './shared/AddUser';
import { titlizeText } from './shared/global';

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
      const response = await axios.get<User[]>('http://localhost:5000/users/all');
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

  const handleLogout = async () => {
    // Clear user information from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page after logout
    navigate('/login');
  };
  const handleDelete = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      const updatedUsers = usersList && usersList.filter((user) => user.id !== userId);
      if(response.data.success){
        setUsersList(updatedUsers);
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching users');
    }
  };
  const handleConfirm = (userId: number) => {
    console.log(userId, $('#confirm'+userId))
    $('#confirm'+userId).show();
    $('#back'+userId).show();
    $('#lbl-del'+userId).show();
    $('#del'+userId).hide();
  }
  const handleBack = (userId: number) => {
    console.log(userId, $('#confirm'+userId))
    $('#confirm'+userId).hide(100);
    $('#back'+userId).hide(100);
    $('#lbl-del'+userId).hide(100);
    $('#del'+userId).show(100);
  }

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

            <div className="alert alert-light" role="alert">
            <h2>Welcome, {username && titlizeText(username)}! <button type="button" className="btn btn-outline-success" disabled>{accountType}</button> </h2></div>
            {accountType === 'admin' && <Button variant="primary btn-sm" onClick={handleShow}>
                <span className="bi bi-person-add"></span> &nbsp;
                Add New User
            </Button> }
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
                  {usersList && usersList.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{titlizeText(user.username)}</td>
                        <td>{titlizeText(user.username)}</td>
                        <td>{user.accountType}</td>
                        {accountType === 'admin'
                        && <td><span className='confirm-btn' id={"lbl-del" + user.id}>Delete?</span>
                          <Button className='btn btn-danger' id={"del" + user.id} onClick={() => handleConfirm(user.id)}>
                            <i className='bi bi-person-dash'/>
                          </Button>

                          </td>}
                          <td><Button className='btn btn-warning confirm-btn' id={"confirm" + user.id} onClick={() => handleDelete(user.id)}>
                            <i className='bi bi-check-circle-fill'/> Yes
                          </Button> &nbsp;
                          <Button className='btn btn-success back-btn' id={"back" + user.id} onClick={() => handleBack(user.id)}>
                            <i className='bi bi-arrow-counterclockwise'/> No
                          </Button></td>

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
    <AddUser show={showModal} handleClose={handleClose} getUsers={getUsers} />
    </div>
  );
};

export default Home;
