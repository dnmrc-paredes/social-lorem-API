const createError = require(`http-errors`)
const post = require(`../models/posts/post`)
const user = require(`../models/users/users`)

const getAllPost = async (req, res, next) => {

    try {

        const getAllData = await post.find({}).populate(`postBy`)

        res.json({
            status: 200,
            results: getAllData.length,
            data: getAllData
        })

    } catch (err) {
        next(createError(400, err))
    }

}

const putPost = async (req, res, next) => {

    const {content, userID} = req.body

    try {

        if (!content) {
            return next(createError(400, "Please input some content."))
        }

        const newPost = await new post({
            content,
            postBy: userID
        })

        await newPost.save()

        await user.findOneAndUpdate({_id: userID}, {
            $addToSet: {
                posts: newPost._id
            }
        })

        res.json({
            data: newPost
        })
        
    } catch (err) {
        next(createError(400, err))
    }
}

const getOnePost = async (req, res, next) => {

    const {id} = req.params

    try {
        
        const getPost = await post.findOne({_id: id})

        res.status(200).json({
            status: res.status,
            data: getPost
        })

    } catch (err) {

        if (err.kind === "ObjectId") {
            return next(createError(400, "Not a valid ObjectId."))
        }

        next(createError(400, err))
    }

}

const deleteOnePost = async (req, res, next) => {

    const {id} = req.params

    try {
        
        const deletingPost = await post.findOneAndDelete({_id: id})

        if (deletingPost === null) {
            return res.json({
                msg: "Data not found."
            })
        }

        res.status(200).json({
            status: res.status,
            data: deletingPost
        })

    } catch (err) {

        if (err.kind === "ObjectId") {
            return next(createError(400, "Not a valid ObjectId."))
        }

        next(createError(400, err))
    }

}

const getUsersPosts = async (req, res, next) => {
    const {userID} = req.params

    try {

        const info = await user.findOne({_id: userID}).populate(`posts`)

        res.status(200).json({
            data: info
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

module.exports = {
    getAllPost,
    putPost,
    getOnePost,
    deleteOnePost,
    getUsersPosts
}