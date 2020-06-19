import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
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

  onRegistration() {
    this.setState({
      register: true
    });
  }

  cancelRegistration() {
    this.setState({
      register: false
    });
  }

  render() {
    // if state not initialized this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (register) return <RegistrationView cancelRegistration={() => this.cancelRegistration()} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}
      onRegistrationClick={() => this.onRegistration()} />;

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

/*MainView.propTypes = {
  none
}; */
