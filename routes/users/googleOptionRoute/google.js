const express = require(`express`)
const router = express.Router()
const passport = require(`passport`)
const jwt = require(`jsonwebtoken`)

const user = require(`../../../models/users/users`)

const {googleFail, googleOption, getUserFromGoogle} = require(`../../../controllers/googleController`)

// router.get(`/auth/google`, passport.authenticate('google', { scope: ['profile', 'email'] }))
// router.get(`/auth/google/callback`, passport.authenticate('google', { failureRedirect: 'https://www.youtube.com/' }),
// async (req, res, next) => {
//   // Successful authentication, redirect home.
//   // res.redirect('http://localhost:3000/home');
//   // res.send(req.user)

router.post(`/auth/google`, getUserFromGoogle )

//   const newUserFromGoogle = new user({
//     firstName: req.user.name.familyName,
//     lastName: req.user.name.givenName,
//     email: req.user._json.email
//   })

//   const existingUser = await user.findOne({email: newUserFromGoogle.email})

//   if (existingUser) {
//       return res.redirect('http://localhost:3000/home')
//   }

//   await newUserFromGoogle.save()
//   next()
// })

module.exports = router