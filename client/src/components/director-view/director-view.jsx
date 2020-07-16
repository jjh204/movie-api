import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import DirectorImage from './director-image.jpg'

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Card style={{ width: '50rem' }} className="director-card">
        <Card.Img variant="top" src={DirectorImage} />
        <Card.Body>
          <Card.Title className="director-name">{director.Name}</Card.Title>
          <Card.Text>Born: {director.Birth}</Card.Text>
          <Card.Text>{director.Bio}</Card.Text>
        </Card.Body>
        <Link to={"/"}>
          <Button variant="link" className="button director-view-back">Back</Button>
        </Link>
      </Card>
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
