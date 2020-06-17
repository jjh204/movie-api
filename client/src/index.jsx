import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

// main componetn that will eventually use all the others
class SuperFlixApplication extends React.Component {
  render() {
    return (
      <div className="super-flix">
        <div>Good Morning!</div>
      </div>
    );
  }
}

// finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render the app in the root DOM element
ReactDOM.render(React.createElement(SuperFlixApplication), container);