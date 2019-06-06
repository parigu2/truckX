const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3000;

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
    try {
        const user = {id: 1, username: 'minkyang'}
        done(null, user)
    } catch (err) {
        done(err)
    }
})

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'SunnyB3aches', // or whatever you like
  resave: false,
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/auth', require('./auth'))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)