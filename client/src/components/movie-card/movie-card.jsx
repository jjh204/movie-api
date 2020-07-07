import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {

  addToFavorites(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    axios.post(`https://superflix-api.herokuapp.com/users/${userId}/Favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log(res);
      alert('This movie has been added to your Favorites.');
    });
  }

  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of the API
    const { movie } = this.props;

    return (
      <Card style={{ width: '22rem' }} className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title + ' - ' + movie.Released}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Details</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button variant="link" onClick={() => this.addToFavorites(movie)}>
            Add to Favorites
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Released: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    Staring: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};