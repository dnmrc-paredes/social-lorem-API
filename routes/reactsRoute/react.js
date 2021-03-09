const express = require(`express`)
const router = express.Router()

const authJWT = require(`../../auth/auth`)
const {reactCounter, likedBy} = require(`../../controllers/reactsController`)

router.post(`/reacts/:postID`, authJWT , reactCounter)
router.get(`/likedby/:postID`, authJWT , likedBy)

module.exports = router