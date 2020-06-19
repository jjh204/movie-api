import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
        alert('Your account has been created!');
      }).catch((e) => {
        console.log('registration error');
      });
  };

  const handleCancellation = () => {
    props.cancelRegistration();
  };

  return (
    <form>
      <label>
        Username:
      <input type="text" value={username} onChange={e => createUsername(e.target.value)} />
      </label>
      <label>
        Email:
      <input type="email" value={email} onChange={e => createEmail(e.target.value)} />
      </label>
      <label>
        Password:
      <input type="password" value={password} onChange={e => createPassword(e.target.value)} />
      </label>
      <label>
        Birthday:
      <input type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleCancellation}>Cancel</button>
    </form>
  );
}

RegistrationView.propTypes = {
  cancelRegistration: PropTypes.func.isRequired
}; 