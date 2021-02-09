import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

/**
  * @requires react
  * @requires prop-types
  * @requires react-redux
  * @requires react-bootstrap/Form
  * @requires ../../actions/actions
  */

/**
 * exporting the visibility view function to allow users to filter through movies
 * @function VisibilityFilterInput
 * @param {string} props 
 */

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="search"
    className="visibility-filter"
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string
};