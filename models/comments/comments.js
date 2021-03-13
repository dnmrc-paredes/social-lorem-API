const mongoose = require(`mongoose`)

const commentSchema = new mongoose.Schema ({
    content: String,
    commentBy: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        }
    ]
})

const comments = new mongoose.model(`comments`, commentSchema)

module.exports = comments