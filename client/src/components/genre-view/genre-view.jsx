import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Card style={{ width: '35rem' }} className="genre-card">
        <Card.Img variant="top" src={genre.Img} />
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>Description: {genre.Description}</Card.Text>
          <Link to={"/"}>
            <Button variant="link" className="button">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Img: PropTypes.string.isRequired
  })
};