import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so React can initialize it
    super();

    // initalize state to empty object so we can deconstruct later
    this.state = {};
  }

  // overriding the render() method of superclass (no need to call super() it does nothing by default)
  render() {
    return (
      <div className="main-view"></div>
    );
  }
}