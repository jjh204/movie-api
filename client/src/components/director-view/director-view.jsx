import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";


import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './director-view.scss';
import DirectorImage from './director-image.jpg'

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

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
                <NavDropdown.Item href="www.linkedin.com/in/jenhobbs204" target="_blank">LinkedIn</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button onClick={this.OnLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <div className="director-view-container">
            <Card style={{ width: '45rem' }} className="director-card">
              <Card.Img variant="top" src={DirectorImage} style={{ maxHeight: 400 }} />
              <Card.Body>
                <Card.Title className="director-name">{director.Name}</Card.Title>
                <Card.Text>Born: {director.Birth}</Card.Text>
                <Card.Text>{director.Bio}</Card.Text>
              </Card.Body>
              <Link to={"/"}>
                <Button variant="link" className="button director-view-back">Back</Button>
              </Link>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  })
};
