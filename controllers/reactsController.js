const createError = require('http-errors')
const post = require('../models/posts/post')
const mongoose = require(`mongoose`)

const reactCounter =  async (req, res, next) => {

    const {postID} = req.params
    const {userID} = req.body

    const postReacted = await post.findOne({_id: postID})

    if (postReacted.likes.includes(userID)) {
        const removeReact = await post.findOneAndUpdate({_id: postID}, {
        $pull: {
            likes: userID
        }

      })

      return res.status(200).json({
        status: res.status,
        data: removeReact
      })

    } else {
        const postReacted = await post.findOneAndUpdate({_id: postID}, {
        $addToSet: {
            likes: userID
        }

      })

      return res.status(200).json({
        status: res.status,
        data: postReacted
      })
    }

}

module.exports = {
    reactCounter
}