import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send the request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    props.onRegistrationClick();
  }

  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername" className="login-item">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="login-item">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox" className="login-item">
        <Form.Check type="checkbox" label="Check if you're ready to SuperFlix!" />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit" className="button" >Login</Button>
      <Button onClick={handleRegistration} variant="info" type="submit" className="button">Register</Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegistrationClick: PropTypes.func.isRequired
};