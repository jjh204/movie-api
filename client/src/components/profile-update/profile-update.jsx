import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './profile-update.scss';
import UpdateImage from './profile-update.jpg';

export function ProfileUpdate(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    axios.put(`https://superflix-api.herokuapp.com/users/${userId}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      const data = res.data;
      localStorage.setItem("user", data.Username);
      alert('Your profile was successfully updated.');
      window.open("/users/:userId", "_self");
    })
      .catch((e) => {
        console.log(e);
        alert('There was an error updating your profile. Please check all fields have been completed.');
      });
  };

  const onLogOut = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  };

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">SuperFlix!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/users/:userId" className="navbar-link">Profile</Nav.Link>
            <NavDropdown title="About Developer" id="collasible-nav-dropdown" className="navbar-link">
              <NavDropdown.Item href="https://jjh204.github.io/portfolio-website" target="_blank">Profile</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/jjh204" target="_blank">GitHub</NavDropdown.Item>
              <NavDropdown.Item href="www.linkedin.com/in/jenhobbs204" target="_blank">LinkedIn</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button onClick={onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="update-profile" style={{ backgroundImage: `url(${UpdateImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <h2>Update your profile</h2>
        <Form className="profile-form">
          <Form.Group controlId="formBasicUsername" className="update-item">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => updateUsername(e.target.value)} placeholder="Update username" autoFocus />
            <Form.Text className="text-muted">
              Must have a minimim of 5 characters
      </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicpassword" className="update-item">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => updatePassword(e.target.value)} placeholder="Update password" />
            <Form.Text className="text-muted">
              We recommend your password to be 8-20 characters long
      </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="update-item">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={e => updateEmail(e.target.value)} placeholder="Update email" />
          </Form.Group>

          <Form.Group controlId="formBasicBirthday" className="update-item">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={e => updateBirthday(e.target.value)} />
          </Form.Group>

          <div className="update-footer">
            <p>We'll never share your private details with anyone else.</p>

            <Button onClick={handleUpdate} variant="light" type="submit" className="button" >Submit</Button>
            <Link to={"/users/:userId"}>
              <Button variant="outline-light" className="button">Cancel</Button>
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  )
};

ProfileUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired
  })
};

export default connect(null, { setUser })(ProfileUpdate);