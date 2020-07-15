import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.post('https://superflix-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then((res) => {
        const data = res.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('This username or password does not exist');
        console.log('Error');
      });
  };

  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername" className="login-item">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="login-item">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox" className="login-item">
        <Form.Check type="checkbox" label="Check if you're ready to SuperFlix!" />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit" className="button" >Login</Button>
      <Link to={"/register"}>
        <Button variant="info" className="button">Register</Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(LoginView);