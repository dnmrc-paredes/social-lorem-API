const express = require(`express`)
const router = express.Router()
const {facebookOption, facebookFail} = require(`../../../controllers/facebookController`)

router.get(`/auth/facebook`, facebookOption)
router.get(`/auth/facebook/callback`, facebookFail)

module.exports = router