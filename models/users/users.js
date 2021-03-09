const mongoose = require(`mongoose`)

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

// const autoPopulateLead = function(next) {
//     this.populate('posts');
//     next();
// };
  
// userSchema.pre('findOne', autoPopulateLead)
// .pre('find', autoPopulateLead)


const user = new mongoose.model('user', userSchema)

module.exports = user