import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';
import CinemaMain from './cinema-main.jpg';

/**
  * @requires react
  * @requires axois
  * @requires prop-types
  * @requires react-redux
  * @requires ../../actions/actions
  * @requires react-router-dom
  * @requires react-bootstrap/Button
  * @requires react-bootstrap/Form
  * @requires ./login-view.scss
  * @requires ./cinema-main.jpg
  */

/**
 * exporting the login view function to allow users to navigate to the log in screen
 * @function LoginView
 * @param {*} props 
 */

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * submitting the log on information to be checked against registered users
   * @type {string} username
   * @type {string} password
   */

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
        alert('There was an error logging you in. Please check your username and password are correct.');
        console.log('Error');
      });
  };

  /**
   * returning the log in form with the required fields for users to complete
   */

  return (
    <div className="login-view" style={{ backgroundImage: `url(${CinemaMain})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="app-title">
        <h1>SuperFlix!</h1>
      </div>
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

        <Button onClick={handleSubmit} variant="danger" type="submit" className="button" >Login</Button>
        <Link to={"/register"}>
          <Button variant="outline-light" className="button">Register</Button>
        </Link>
      </Form>
    </div>
  );
}

/**
 * setting the prop types to the login view that are required to log in
 */

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(LoginView);