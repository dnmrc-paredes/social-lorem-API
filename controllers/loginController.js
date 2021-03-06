const createError = require(`http-errors`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const user = require(`../models/users/users`)

const loginUser = async (req, res, next) => {
    const {email, password} = req.body

    try {
        
        if (!email || !password) {
            return next(createError(400, "Please provide all inputs."))
        }

        const existingUser = await user.findOne({email})

        if (existingUser) {

            const result = await bcrypt.compare(password, existingUser.password)

            if (result) {
                
                const token = jwt.sign({id: existingUser._id}, process.env.JWT_KEY)

                res.status(200).json({
                    status: res.status,
                    user: existingUser,
                    token
                })

            } else {
                return next(createError(400, "Invalid Email or Password."))
            }

        } else {
            return next(createError(400, "Invalid Email or Password"))
        }

    } catch (err) {
        next(createError(400, err))
    }

}

module.exports = { loginUser }