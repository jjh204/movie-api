import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    // This is given to the <MovieCard/> component by the outer world 
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of the API
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <Card key={movie._id} style={{ width: '30rem', margin: 55 }} >
          <Card.Img variant="top" src={movie.ImagePath} style={{ maxHeight: 650 }} className="movie-card-img" />
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
          </Card.Body>
        </Card>
      </div>
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