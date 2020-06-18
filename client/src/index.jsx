import React from 'react';
import ReactDOM from 'react-dom';

// importing the main-view from directory
import { MainView } from './components/main-view/main-view';

import './index.scss';

// main componetn that will eventually use all the others
class SuperFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

// finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render the app in the root DOM element
ReactDOM.render(React.createElement(SuperFlixApplication), container);

