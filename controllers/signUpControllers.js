const createError = require(`http-errors`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcrypt`)
const saltRounds = 10

const user = require(`../models/users/users`)

const signUpUser = async (req, res, next) => {
    const {firstName, lastName, email, password, passwordConfirm} = req.body

    try {
        
        if (!firstName || !lastName || !email || !password || !passwordConfirm) {
            return next(createError(400, "Please provide all inputs."))
        }

        if (password !== passwordConfirm) {
            return next(createError(400, "Password must match."))
        }

        if (password.length < 5) {
            return next(createError(400, "Password must be 8 characters long."))
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        
        const registeringUser = new user ({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await registeringUser.save()
        const token = jwt.sign({id: registeringUser._id}, process.env.JWT_KEY)

        res.status(200).json({
            status: "Successfully registered.",
            user: registeringUser,
            token
        })

    } catch (err) {
        
        if (err.code === 11000) {
            return next(createError(400, "Email already taken."))
        }

        if (err.name === "ValidationError") {
            return next(createError(400, "Email must be valid."))
        }

        next(createError(400, err))
    }

}

module.exports = { signUpUser }