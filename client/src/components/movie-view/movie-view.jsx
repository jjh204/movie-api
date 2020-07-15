import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  formatStaring(staring) {
    if (staring) staring = staring.join(', ');
    return staring;
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Card style={{ width: '50rem' }} className="movie-view">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="movie-view-body">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Released: {movie.Released}</Card.Text>
          <Card.Text>Description: {movie.Description}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          <Card.Text>Staring: {this.formatStaring(movie.Staring)}</Card.Text>
          <Link to={"/"}>
            <Button variant="link" className="movie-view-back-button">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
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
  })
};