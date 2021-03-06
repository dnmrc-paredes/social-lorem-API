const express = require(`express`)
const router = express.Router()

const authJWT = require(`../../auth/auth`)

const {getAllPost, putPost, getOnePost, deleteOnePost} = require(`../../controllers/postsControllers`)

router.get(`/getallpost`, authJWT, getAllPost)
router.post(`/createpost`, authJWT, putPost)
router.get(`/getonepost/:id`, authJWT, getOnePost)
router.delete(`/deleteonepost/:id`, authJWT, deleteOnePost)

module.exports = router