const createError = require(`http-errors`)
const passport = require(`passport`)
const FacebookStrategy = require(`passport-facebook`).Strategy

// const strat = async (req, res, next) => {
//     passport.use( new FacebookStrategy({
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: "http://localhost:3000/auth/facebook/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//       }))
// }

const facebookOption = async (req, res, next) => {
    passport.authenticate('facebook')
}

const facebookFail = async (req, res, next) => {
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
}

module.exports = {
    facebookOption,
    facebookFail
}