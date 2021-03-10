const createError = require('http-errors')
const post = require('../models/posts/post')
const mongoose = require(`mongoose`)

const reactCounter =  async (req, res, next) => {

    const {postID} = req.params
    const {userID} = req.body

    const postReacted = await post.findOne({_id: postID})

      if (userID === null) {
        return
      } else if (postReacted.likes.includes(userID)) {
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

const likedBy = async (req, res, next) => {

  const {postID} = req.params

  try {

    const info = await post.findOne({_id: postID}).populate('likes')

    res.status(200).json({
      data: info
    })
    
  } catch (err) {
    next(createError(400, err))
  }

}

module.exports = {
    reactCounter,
    likedBy
}