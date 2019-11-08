const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression')
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const app = express();
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000;
// module.exports = app

if (process.env.NODE_ENV === 'test') {
    after('close the session store', () => sessionStore.stopExpiringSessions())
}

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.models.user.findByPk(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
})

// app.use(morgan('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'SunnyB3aches', // or whatever you like
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', require('./auth'));
// app.use('/api', require('./api'));

// app.use(express.static(path.join(__dirname, '../public')));

// // any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//     if (path.extname(req.path).length) {
//         const err = new Error('Not found')
//         err.status = 404
//         next(err)
//     } else {
//         next()
//     }
// })

// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// });

// app.use((err, req, res, next) => {
//     console.error(err)
//     console.error(err.stack)
//     res.status(err.status || 500).send(err.message || 'Internal server error.')
// })

// const server = app.listen(PORT, () =>
//     console.log(`Listening at http://localhost:${PORT}`)
// )

// sessionStore.sync()
// db.sync()

// const io = socketio(server);

// io.on('connection', socket => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)

//     socket.on('shipmentUpdate', () => {
//         socket.broadcast.emit('updateReceive')
//     })

//     socket.on('pickupRequest', (pickup, delivery) => {
//         socket.broadcast.emit('pickupRequested', pickup, delivery)
//     })

//     socket.on('disconnect', () => {
//         console.log(`connection ${socket.id} has left the building`)
//     })
// })

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'))

    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    // compression middleware
    app.use(compression())

    // session middleware with passport
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'my best friend is Cody',
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    // auth and api routes
    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'))

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')))

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found')
            err.status = 404
            next(err)
        } else {
            next()
        }
    })

    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    })

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
}

const startListening = () => {
// start listening (and create a 'server' object representing our server)
const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)

// set up our socket control center
const io = socketio(server)
    require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
    await sessionStore.sync()
    await syncDb()
    await createApp()
    await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
    bootApp()
} else {
    createApp()
}
