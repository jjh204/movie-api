import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import Button from 'react-bootstrap/Button';

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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://superflix-api.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
        <Button onClick={onLogOut} variant="dark" type="submit" className="button">Log Out</Button>
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
