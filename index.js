const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Joker',
    released: '2019',
    director: 'Todd Phillips',
    staring: 'Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy'
  },
  {
    title: 'The Dark Knight Rises',
    released: '2012',
    director: 'Christopher Nolan',
    staring: 'Christian Bale, Tom Hardy, Anne Hathaway, Gary Oldman'
  },
  {
    title: 'Suicide Squad',
    released: '2016',
    director: 'David Ayer',
    staring: 'Will Smith, Jared Leto, Margot Robbie, Viola Davis'
  },
  {
    title: 'Man of Steel',
    released: '2013',
    director: 'Zack Snyder',
    staring: 'Henry Cavill, Amy Adams, Michael Shannon, Diane Lane'
  },
  {
    title: 'Guardians of the Galaxy',
    released: '2014',
    director: 'James Gunn',
    staring: 'Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldana'
  },
  {
    title: 'Watchmen',
    released: '2009',
    director: 'Zack Snyder',
    staring: 'Jackie Earle Haley, Patrick Wilson, Carla Gugino, Malin Akerman'
  },
  {
    title: 'Batman Begins',
    released: '2005',
    director: 'Christopher Nolan',
    staring: 'Christian Bale, Michael Caine, Ken Watanabe, Liam Neeson'
  },
  {
    title: 'Green Lantern',
    released: '2011',
    director: 'Greg Berlanti',
    staring:  'Ryan Reynolds, Blake Lively, Peter Sarsgaard'
  },
  {
    title: 'Thor: Ragnarok',
    released: '2017',
    director: 'Taika Waititi',
    staring: 'Chris Hemsworth, Tom Hiddleston, Cate Blanchett, Mark Ruffalo'
  },
  {
    title: 'Deadpool',
    released: '2016',
    director: 'Tim Miller',
    staring: 'Ryan Reynolds, Morena Baccarin, T.J. Miller'
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to SuperFlix - an app that takes the stress out of choosing your next superhero movie!');
});

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.listen(8080, () => {
console.log('My first Node test server is running on Port 8080.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
