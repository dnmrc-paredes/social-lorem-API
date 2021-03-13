const passport = require(`passport`)
const user = require(`../models/users/users`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const googleOption = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile'] })
}

const googleFail = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
}

const getUserFromGoogle = async (req, res, next) => {
    const {googleUser} = req.body 

    try {

        const newUserFromGoogle = new user({
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            email: googleUser.email
        })

        const token = jwt.sign({id: newUserFromGoogle._id}, process.env.JWT_KEY )

        const existingUser = user .findOne({email: googleUser.email})

        if (existingUser) {
            return res.json({
                status: res.status,
                data: newUserFromGoogle,
                token
            })
        }
    
        const savedUser = await newUserFromGoogle.save()
    
        res.status(200).json({
            status: res.status,
            data: savedUser,
            token
        })
    
    } catch (err) {

        if (err.code === 11000) {
            return next(createError(400, "Email already taken."))
        }

        next(createError(400, err))
    }
}

module.exports = {
    googleOption,
    googleFail,
    getUserFromGoogle
}