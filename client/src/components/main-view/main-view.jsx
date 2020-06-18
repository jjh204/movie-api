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

export class MainView extends React.Component {
  componentDidMount() {
    axios.get('<my-api-endpoint/movies')
      .then(response => {
        // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // if state not initialized this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // before the movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}
