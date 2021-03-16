require('dotenv').config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const cors = require(`cors`)
const helmet = require(`helmet`)
const passport = require(`passport`)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require(`passport-facebook`).Strategy
const session = require(`express-session`)

const user = require(`./models/users/users`)

const app = express()

// passport.use( new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:8000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//       return cb(err, profile);
// }))

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   return done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   return done(err, user);
// });

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     console.log(profile)
//     cb(null, profile)
//   }
// ));

const rootRouter = require(`./routes/rootRoute/root`)
const signUpRouter = require(`./routes/users/signUpRoute/signUp`)
const loginRouter = require(`./routes/users/loginRoute/login`)
const postsRouter = require(`./routes/postsRoute/posts`)
const reactsRouter = require('./routes/reactsRoute/react')
const profileRouter = require(`./routes/users/profileRoute/profile`)
// const facebookOptionRouter = require(`./routes/users/facebookOptionRoute/facebookOptionRoute`)
const googleOptionRouter = require(`./routes/users/googleOptionRoute/google`)

app.use(rootRouter)
app.use(loginRouter)
app.use(signUpRouter)
app.use(postsRouter)
app.use(reactsRouter)
app.use(profileRouter)
// app.use(facebookOptionRouter)
app.use(googleOptionRouter, cors())

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: 'https://www.youtube.com/' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     // res.redirect('/');
//     // res.send(req.user)

//     const newUserFromGoogle = new user({
//       firstName: req.user.name.familyName,
//       lastName: req.user.name.givenName,
//       email: req.user._json.email
//     })

//     newUserFromGoogle.save()

//     res.redirect(`/`)

//   });

// Error Handler
app.use((req, res, next) => {
    next(createError(404, "Not found."))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        status: res.status,
        msg: err.message,
        fullError: err
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on Port 8000.`)
})