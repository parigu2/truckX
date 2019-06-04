const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const app = express();

app.use(morgan('dev'));

app.use(session({
  secret: 'SunnyB3aches', // or whatever you like
  resave: false,
  saveUninitialized: true 
}));

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/auth', require('./auth'))

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(3000, () => 
    console.log('Listening at http://localhost:3000')
)