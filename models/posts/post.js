const mongoose = require(`mongoose`)

const postSchema = new mongoose.Schema({
    content: String,
    comments: [],
    likes: {
        type: Number,
        default: 0
    }
})

const post = new mongoose.model('post', postSchema)

module.exports = post