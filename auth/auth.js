const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const authJWT = (req, res, next) => {
    
    let token

        if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
           token = req.headers.auth.split(` `)[1]

           jwt.verify(token, process.env.JWT_KEY)
           return next()
        }

        if (!token) {
            return next(createError(401, "Unauthorized."))
        }

}

module.exports = authJWT