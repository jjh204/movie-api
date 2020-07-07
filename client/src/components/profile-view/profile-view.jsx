import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.toString().substring(0, 10);
    const newDate = date.split('-').reverse().join('-');
    return newDate;
  }

  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://superflix-api.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: this.formatDate(res.data.Birthday),
        Favorites: res.data.Favorites
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  deleteUser(token) {
    const userId = localStorage.getItem('user');
    if (!confirm('Are you sure you want to delete your profile?')) return;
    axios.delete(`https://superflix-api.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) =>
      console.log(res));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  deleteFavorites(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    axios.delete(`https://superflix-api.herokuapp.com/users/${userId}/Favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      console.log(res);
      this.componentDidMount();
    });
  }

  render() {
    const { movies } = this.props;
    const favoritesList = movies.filter((movie) => {
      this.state.Favorites.includes(movie);
    });

    return (
      <div>
        <Container>
          <h1>Welcome {this.state.Username}!</h1>
          <Card style={{ width: '60rem' }} className="profile-view">
            <Card.Body>
              <Link to={`/`} className="profile-back">Back</Link>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              <Link to={'/users/:userId/update'}>
                <Button size="sm" variant="outline-primary">Update Profile</Button>
              </Link>
              <Button onClick={() => this.deleteUser()} size="sm" variant="outline-dark">Delete Profile</Button>
            </Card.Body>
          </Card>
          <div>
            <h1>Favorite Movies:</h1>
            {favoritesList.map((movie) => {
              return (
                <div key={movie._id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button size="sm" onClick={() => this.deleteFavorites(movie)}>
                    Remove Favorite
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    Favorites: PropTypes.array
  })
};