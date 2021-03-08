const express = require(`express`)
const router = express.Router()

const authJWT = require(`../../auth/auth`)
const {reactCounter} = require(`../../controllers/reactsController`)

router.post(`/reacts/:postID/`, authJWT, reactCounter)

module.exports = router