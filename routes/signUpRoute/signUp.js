const express = require(`express`)
const router = express.Router()
const {signUpUser} = require(`../../controllers/signUpControllers`)

router.post(`/signup`, signUpUser)

module.exports = router