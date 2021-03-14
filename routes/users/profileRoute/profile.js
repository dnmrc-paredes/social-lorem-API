const express =require(`express`)
const router = express.Router()

const authJWT = require(`../../../auth/auth`)
const {editProfile, getCurrentUserInfo} = require(`../../../controllers/profileController`)

router.get(`/getcurrentuser/:userID`, authJWT, getCurrentUserInfo )
router.post(`/editprofile`, authJWT, editProfile)

module.exports = router