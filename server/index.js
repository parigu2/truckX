const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const socketio = require('socket.io')
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

const server = app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)

const io = socketio(server);

io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('shipmentUpdate', () => {
        socket.broadcast.emit('updateReceive')
    })

    socket.on('pickupRequest', (pickup, delivery) => {
        socket.broadcast.emit('pickupRequested', pickup, delivery)
    })

    socket.on('disconnect', () => {
        console.log(`connection ${socket.id} has left the building`)
    })
})