import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {

  addToFavorites(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    axios.post(`https://superflix-api.herokuapp.com/users/${userId}/Favorites/${movie._id}`, { username: localStorage.getItem('user') }, {
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
      <Card style={{ width: '30rem', margin: 50 }} className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} className="movie-card-img" />
        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Title className="movie-card-title">{movie.Title + ' - ' + movie.Released}</Card.Title>
          </Link>
          <Card.Text style={{ height: '20rem' }}>{movie.Description}</Card.Text>
          <div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link" className="movie-links movie-card-director">Director Info</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link" className="movie-links movie-card-genre">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <Button size='sm' variant="link" onClick={() => this.addToFavorites(movie)} className="movie-card-fav">Add Favorite</Button>
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
      Description: PropTypes.string.isRequired,
      Img: PropTypes.string.isRequired
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