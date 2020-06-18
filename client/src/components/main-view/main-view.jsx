import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    axios.get('<https://superflix-api.herokuapp.com/movies>')
      .then((response) => {
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
