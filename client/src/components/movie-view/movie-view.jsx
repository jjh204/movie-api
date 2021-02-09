import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

/**
  * @requires react
  * @requires axois
  * @requires prop-types
  * @requires react-router-dom
  * @requires react-bootstrap/Container
  * @requires react-bootstrap/Card
  * @requires react-bootstrap/Button
  * @requires ./movie-view.scss
  */

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  /**
   * Using a function to improve the formatting of the starting data. This is adding
   * a comma between first and last names.
   * @function formatString
   * @param {string} staring 
   */

  formatStaring(staring) {
    if (staring) staring = staring.join(', ');
    return staring;
  }

  /**
   * when a user selects their favorite movie this function enable it to be added to the
   * users favorite movie list in their profile view
   * @function addToFavorites
   * @param {array} movie 
   */

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

  /**
   * function to allow users to log out of the app
   * @function onLogOut
   */

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  }

  /**
   * rendering the whole imformation for the movie in a new movie view
   */

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div>
        <Container className="movie-view-container">
          <div className="movie-view">
            <img src={movie.ImagePath} className="movie-view-img" />
            <Card style={{ width: '33rem', height: '49rem' }} className="movie-view-card">
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
              <div className="movie-view-links">
                <Button variant="link" onClick={() => this.addToFavorites(movie)} className="movie-card-fav">Add favorite!</Button>
                <Link to={"/"}>
                  <Button variant="link" className="movie-view-back">Back</Button>
                </Link>
              </div>
            </Card>
          </div>
        </Container>
        <footer>
          <p>Designed and created by Jen Hobbs. </p>
          <p>Movie data from IMDB. Photo's from UnSplash.</p>
        </footer>
      </div>
    );
  }
}

/**
 * setting the prop types that are allowed for the movie view
 * @type {array} movie
 */

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