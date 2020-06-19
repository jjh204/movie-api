import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://superflix-api.herokuapp.com/users',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }).then((response) => {
        const data = response.data;
        console.log(data);
        alert('Your account has been created! Please Login.');
      }).catch((e) => {
        console.log('registration error');
      });
  };

  const handleCancellation = () => {
    props.cancelRegistration();
  };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formBasicUsername" className="registration-item">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => createUsername(e.target.value)} placeholder="Create username" />
        <Form.Text className="text-muted">
          Must have a minimim of 5 characters
      </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="registration-item">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => createEmail(e.target.value)} placeholder="Enter valid email" />
        <Form.Text className="text-muted">
          We'll never share your email address with anyone else
      </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicpassword" className="registration-item">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => createPassword(e.target.value)} placeholder="Create password" />
        <Form.Text className="text-muted">
          Your password should be 8-20 characters long
      </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday" className="registration-item">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your date of birth with anyone else
      </Form.Text>
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit" className="button" >Submit</Button>
      <Button onClick={handleCancellation} variant="outline-primary" type="submit" className="button" >Cancel</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  cancelRegistration: PropTypes.func.isRequired
}; 