const createError = require(`http-errors`)
const post = require(`../models/posts/post`)

const getAllPost = async (req, res, next) => {

    try {

        const getAllData = await post.find({})

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

    const {content} = req.body

    try {

        if (!content) {
            return next(createError(400, "Please input some content."))
        }

        const newPost = await new post({
            content
        })

        await newPost.save()

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

module.exports = {
    getAllPost,
    putPost,
    getOnePost,
    deleteOnePost
}