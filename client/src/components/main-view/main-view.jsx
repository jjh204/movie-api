import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './main-view.scss';

/**
  * @requires react
  * @requires axois
  * @requires react-redux
  * @requires react-router-dom
  * @requires ../../actions/actions
  * @requires ../movies-list/movies-list
  * @requires ../registration-view/registration-view
  * @requires ../login-view/login-view
  * @requires ../movie-view/movie-view
  * @requires ../director-view/director-view
  * @requires ../genre-view/genre-view
  * @requires ../profile-view/profile-view
  * @requires ../profile-update/profile-update
  * @requires react-router-dom
  * @requires react-bootstrap/Container
  * @requires react-bootstrap/Button
  * @requires react-bootstrap/Nav
  * @requires react-bootstrap/Navbar
  * @requires ./main-view.scss
  */

export class MainView extends React.Component {

  constructor() {
    super();

    /* this.state = {
         movies: [],
         user: null 
  }; */
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      /* this.setState({
         user: localStorage.getItem('user'),
       }); */
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  /**
   * checking that the user is logged in against the registered users list. If logged in then the auth
   * data is stored and the full movie view can be rendered
   * @function onLoggedIn
   * @param {*} authData 
   */

  onLoggedIn(authData) {
    console.log(authData);
    //this.setState({
    //user: authData.user.Username
    //});
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /**
   * API call to get movies from the stored database. The user must be logged in for this
   * call to return.
   * @function getMovies
   * @param {string} token
   */

  getMovies(token) {
    axios.get('https://superflix-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // the redux code being implemented
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * function to allow users to log out of the app
   * @function onLogOut
   */

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  }

  /**
   * rendering the main view components. If user is not logged in or registered then they can do so. Once
   * the user exists then they will receive the full movie view list and be able to navigate to the 
   * profile view and favorite movies list.
   */

  render() {
    // if state not initialized this will throw on runtime
    // before the data is initially loaded

    // now updated for Redux 
    let { movies, user } = this.props;

    // before the movies have loaded
    if (!movies) return <div className="main-view" />;

    if (!user) {
      return (
        <Router basename="/client">
          <div className="main-view">
            <Container>
              <Route exact path="/" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
              <Route exact path="/register" render={() => <RegistrationView />} />
            </Container>
          </div>
        </Router>
      );
    } else {
      return (
        <Router basename="/client">
          <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">SuperFlix!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/users/:userId" className="navbar-link">Profile</Nav.Link>
                <Nav.Link href="https://jjh204.github.io/portfolio-website" target="_blank" className="navbar-link">Developer Portfolio</Nav.Link>
              </Nav>
              <Button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-view">
            <Route exact path="/" render={() => <MoviesList movies={movies} />} />

            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

            <Route path="/directors/:name" render={({ match }) => {
              if (!movies || movies.length === 0) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }} />

            <Route path="/genres/:name" render={({ match }) => {
              if (!movies || movies.length === 0) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            }} />

            <Route path="/users/:userId" render={() => <ProfileView movies={movies} />} />
            <Route path="/users/:userId/update" render={() => <ProfileUpdate movies={movies} />} />
          </div>
        </Router>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

