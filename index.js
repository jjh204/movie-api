const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

let movies = [
  {
    title: 'Joker',
    released: '2019',
    director: 'Todd Phillips',
    staring: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
    genre: ['Crime', 'Drama', 'Thriller']
  },
  {
    title: 'The Dark Knight Rises',
    released: '2012',
    director: 'Christopher Nolan',
    staring: ['Christian Bale', 'Tom Hardy', 'Anne Hathaway', 'Gary Oldman'],
    genre: ['Action', 'Adventure']
  },
  {
    title: 'Suicide Squad',
    released: '2016',
    director: 'David Ayer',
    staring: ['Will Smith', 'Jared Leto', 'Margot Robbie', 'Viola Davis'],
    genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi']
  },
  {
    title: 'Man of Steel',
    released: '2013',
    director: 'Zack Snyder',
    staring: ['Henry Cavill', 'Amy Adams', 'Michael Shannon', 'Diane Lane'],
    genre: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    title: 'Guardians of the Galaxy',
    released: '2014',
    director: 'James Gunn',
    staring: ['Chris Pratt', 'Vin Diesel', 'Bradley Cooper', 'Zoe Saldana'],
    genre: ['Action', 'Adventure', 'Comedy', 'Sci-Fi']
  },
  {
    title: 'Watchmen',
    released: '2009',
    director: 'Zack Snyder',
    staring: ['Jackie Earle Haley', 'Patrick Wilson', 'Carla Gugino', 'Malin Akerman'],
    genre: ['Action', 'Drama', 'Mystery', 'Sci-Fi']
  },
  {
    title: 'Batman Begins',
    released: '2005',
    director: 'Christopher Nolan',
    staring: ['Christian Bale', 'Michael Caine', 'Ken Watanabe', 'Liam Neeson'],
    genre: ['Action', 'Adventure']
  },
  {
    title: 'Green Lantern',
    released: '2011',
    director: 'Greg Berlanti',
    staring:  ['Ryan Reynolds', 'Blake Lively', 'Peter Sarsgaard'],
    genre: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    title: 'Thor: Ragnarok',
    released: '2017',
    director: 'Taika Waititi',
    staring: ['Chris Hemsworth', 'Tom Hiddleston', 'Cate Blanchett', 'Mark Ruffalo'],
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Sci-Fi']
  },
  {
    title: 'Deadpool',
    released: '2016',
    director: 'Tim Miller',
    staring: ['Ryan Reynolds', 'Morena Baccarin', 'T.J. Miller'],
    genre: ['Action', 'Adventure', 'Comedy', 'Sci-Fi']
  }
];

app.get('/', (req, res) => {
  res.status(201).send('Welcome to SuperFlix - an app that takes the stress out of choosing your next superhero movie!');
});

// gets the full list of movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// gets the data for a single movie searched by name
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => { return movie.title === req.params.title }));
});

// gets the detials about the genre when searching by genre
app.get('/movies/genres/:genre', (req, res) => {
res.status(201).send('Successfully display movies by genres.');
});

// gets the details about the director when searching by director name
app.get('/movies/directors/:director', (req, res) => {
  res.status(201).send('Successfully display specific director details')
});

// allows new users to sign up adding a name, email and password as minimum
app.post('/users/register', (req, res) => {
  res.status(201).send('User profile successfully created.');
});

// directed to users homepage
app.get('/users/:id', (req, res) => {
  res.status(201).send('Welcome ' + user.name);
})

// allowing users to update their name
app.put('/users/:id/updates', (req, res) => {
  res.status(201).send('Successfully allow existing users to update profile details.')
});

// allows users to delete their profile
app.delete('/users/:id/deregister', (req, res) => {
  res.status(201).send('Successfully allow existing users to deregister.')
});

// allows users to add movies to their favorites list by name
app.post('/users/:id/favorites/add/:title', (req, res) => {
  res.status(201).send('Successfully add a specific movie to users favorites list.')
});

// alolows users to remove movies from their favorites list by name
app.delete('/users/:id/favorites/remove/:title', (req, res) => {
res.status(201).send('User profile successfully deleted.')
});

app.use(express.static('public'));

// this is the app listening to the server
app.listen(8080, () => {
console.log('My first Node test server is running on Port 8080.');
});

//general error code for app
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
