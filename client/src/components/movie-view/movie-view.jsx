import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
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
      <Container className="movie-view">
        <Card style={{ float: 'left', width: '33rem', height: '49rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
        </Card>
        <Card style={{ width: '33rem', height: '49rem' }}>
          <Card.Body className="movie-view-body">
            <Card.Title className="movie-view-title">{movie.Title + ' - ' + movie.Released}</Card.Title>
            <Card.Text className="movie-view-text">{movie.Description}</Card.Text>
            <Card.Text className="movie-view-text">This movie was released in {movie.Released}.</Card.Text>
            <h1 className="movie-view-heading">Staring: </h1>
            <Card.Text className="movie-view-text">{this.formatStaring(movie.Staring)}</Card.Text>
            <h1 className="movie-view-heading">Director: </h1>
            <Card.Text className="movie-view-text">{movie.Director.Name}</Card.Text>
            <h1 className="movie-view-heading">Genre: </h1>
            <Card.Text className="movie-view-text">{movie.Genre.Name}</Card.Text>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="link" className="button movie-view-back">Back</Button>
          </Link>
        </Card>
      </Container>
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