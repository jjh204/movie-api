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

  formatDate(date) {
    if (date) date = date.toString().substring(0, 10);
    const newDate = date.split('-').reverse().join('-');
    return newDate;
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://superflix-api.herokuapp.com/users/${username}`, {
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

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) =>
      this.state.favorites.includes(movie._id)
    );

    return (
      <div>
        <Container>
          <h1>Welcome {this.state.Username}!</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: xxxxxx</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              Favorite Movies:
                {favoriteMovieList.map((movie) => (
                <div key={movie._id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button size="sm" onClick={(e) => this.deleteFavoriteMovie(movie._id)}>Remove Favorite</Button>
                </div>))}
              <br />
              <br />
              <Link to={'/user/update'}>
                <Button size="sm" variant="outline-primary">Update Profile</Button>
                <br />
                <br />
              </Link>
              <Button onClick={() => this.deleteUser()} size="sm" variant="dark">Delete Profile</Button>
              <br />
              <br />
              <Link to={`/`}>Back</Link>
            </Card.Body>
          </Card>
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