const mongoose = require(`mongoose`)

const postSchema = new mongoose.Schema({
    content: String,
    comments: [],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const post = new mongoose.model('post', postSchema)

module.exports = post