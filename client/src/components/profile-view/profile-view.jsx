import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import Moment from 'moment';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile-view.scss';
import ProfileImage from './profile-image.jpg';

/**
  * @requires react
  * @requires axois
  * @requires prop-types
  * @requires react-router-dom
  * @requires react-redux
  * @requires ../../actions/actions
  * @requires moment
  * @requires react-bootstrap/Container
  * @requires react-bootstrap/Button
  * @requires react-bootstrap/Card
  * @requires ./profile-view.scss
  * @requires ./profile-image.jpg
  */

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      Favorites: [],
      movies: [],
    };
  }

  /**
   * function call to get the user token to be able to display the current users information
   * @function getUser
   * @param {string} token 
   */

  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://superflix-api.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
        Favorites: res.data.Favorites
      });

    }).catch(function (err) {
      console.log(err);
    });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  /**
  * function enabling the user to delete their profile from the database should they wish to.
  * This code also includes a double check alert to comfirm deletion.
  * @function deleteUser
  * @param {string} token 
  */

  deleteUser(token) {
    const userId = localStorage.getItem('user');
    if (!confirm('Are you sure you want to delete your profile?')) return;
    axios.delete(`https://superflix-api.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) =>
      console.log(res));
    localStorage.removeItem('token');
    window.open('/client', '_self');
  }

  /**
  * function enabling the user to delete movies from their favorite movies list
  * @function deleteFavorites
  * @param {array} movie 
  */

  deleteFavorites(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    axios.delete(`https://superflix-api.herokuapp.com/users/${userId}/Favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      console.log(res);
      this.componentDidMount();
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
   * rendering the profile view to display the current users information as well as their favorite 
   * movies list as created by the current user. Favorite movies can be viewed or deleted
   * from this view.
   */

  render() {
    const { movies } = this.props;
    const userFavorites = this.state.Favorites;
    const favoritesList = movies.filter((movie) => userFavorites.includes(movie._id));

    return (
      <Container>
        <h1 className="profile-title">Welcome {this.state.Username}!</h1>
        <Card style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover', width: '50rem' }} className="profile-view">
          <Card.Body>
            <Link to={`/`} className="profile-back">Back</Link>
            <Card.Text className="profile-text profile-text-first">Username: {this.state.Username}</Card.Text>
            <Card.Text className="profile-text">Email: {this.state.Email}</Card.Text>
            <Card.Text className="profile-text">Birthday: {Moment(this.state.Birthday).format('DD-MMMM-YYYY')}</Card.Text>
            <Link to={"/users/:userId/update"}>
              <Button size="sm" variant="dark" className="profile-button">Update Profile</Button>
            </Link>
            <Button onClick={() => this.deleteUser()} size="sm" variant="danger" className="profile-button">Delete Profile</Button>
          </Card.Body>
        </Card>
        <Container fluide="true">
          <h1 className="favorites-title">Your Favorites:</h1>
          {favoritesList.map((movie) => {
            return (
              <Card key={movie._id} style={{ width: '15rem', margin: 15 }} className="fav-movies">
                <Card.Img variant="top" src={movie.ImagePath} style={{ maxHeight: 350 }} />
                <Card.Body>
                  <Link to={`/movies/${movie._id}`}>
                    <Button size="sm" variant="link">Details</Button>
                  </Link>
                  <Button size="sm" variant="link" onClick={() => this.deleteFavorites(movie)} className="remove-fav">
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    );
  }
}

/**
 * setting the prop types to the profile view that are required for the users profile
 */

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    Favorites: PropTypes.array
  })
};

export default connect(null, { setUser })(ProfileView);