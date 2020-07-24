import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
          <Navbar.Brand as={Link} to="/" className="navbar-brand">SuperFlix!</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/users/:userId" className="navbar-link">Profile</Nav.Link>
              <NavDropdown title="About Developer" id="collasible-nav-dropdown" className="navbar-link">
                <NavDropdown.Item href="https://jjh204.github.io/portfolio-website" target="_blank">Profile</NavDropdown.Item>
                <NavDropdown.Item href="https://github.com/jjh204" target="_blank">GitHub</NavDropdown.Item>
                <NavDropdown.Item href="https://www.linkedin.com/in/jenhobbs204/" target="_blank">LinkedIn</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
          </Navbar.Collapse>
        </Navbar>
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
      </div>
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