const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
})

const user = new mongoose.model('user', userSchema)

module.exports = user