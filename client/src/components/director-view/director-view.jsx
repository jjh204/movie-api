import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './director-view.scss';
import DirectorImage from './director-image.jpg';

/**
  * @requires react
  * @requires prop-types
  * @requires react-router-dom
  * @requires react-bootstrap/Button
  * @requires react-bootstrap/Container
  * @requires react-bootstrap/Card
  * @requires ./director-view.scss
  * @requires ./director-image.jpg
  */

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    /**
     * rendering the director view component 
     */
    const { director } = this.props;

    if (!director) return <div className="main-view" />;

    return (
      <div>
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
        <footer>
          <p>Designed and created by Jen Hobbs. </p>
          <p>Director information from Wikipedia. Photo's from UnSplash.</p>
        </footer>
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
