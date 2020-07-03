import React from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import Button from 'react-bootstrap/Button';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
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
      headers: { Authorization: `Bearer ${token}` }
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
    window.open('/', '_self');
  }

  render() {
    // if state not initialized this will throw on runtime
    // before the data is initially loaded
    const { movies, user } = this.state;

    // before the movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <Link to={"/users/:userId"}>
          <Button variant="info" className="button">Profile</Button>
        </Link>
        <Button onClick={this.onLogOut} variant="dark" type="submit" className="button"> Log Out</Button>
        <Route exact path="/" render={() => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          return movies.map(m => <MovieCard key={m._id} movie={m} />)
        }} />

        <div className="main-view">
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route path="/genres/:name" render={({ match }) => {

            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />
          <Route exact path="/users/:userId" render={() => <ProfileView movies={movies} />} />
          <Route exact path="/users/:userId/update" render={() => <ProfileUpdate movies={movies} />} />
        </div>
      </Router>
    );
  }
}

/*MainView.propTypes = {

}; */
