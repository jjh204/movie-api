import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

const onLogOut = (e) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.open('/client', '_self');
};

export function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
      || m.Director.Name.toLowerCase().includes(visibilityFilter.toLowerCase())
      || m.Genre.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  return <div className="movies-list">
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
        <Button onClick={onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
      </Navbar.Collapse>
    </Navbar>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
