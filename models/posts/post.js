const mongoose = require(`mongoose`)

const postSchema = new mongoose.Schema({
    content: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
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

// const populateLikesAndPost = function(next) {
//     this.populate('postBy');
//     next();
// };
  
// postSchema.pre('findOne', populateLikesAndPost)
// .pre('find', populateLikesAndPost)

const post = new mongoose.model('post', postSchema)

module.exports = post