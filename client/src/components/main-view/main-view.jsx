import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://superflix-api.herokuapp.com/movies')
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // if state not initialized this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // before the movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <div>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => this.onBackClick()}
            />
          </div>
        ) : (
            movies.map(movie => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClick={movie => this.onMovieClick(movie)}
              />
            ))
          )}
      </div>
    );
  }
}

/*MainView.PropTypes = {
  none
}; */
