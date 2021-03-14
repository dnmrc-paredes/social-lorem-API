const createError = require(`http-errors`)
const user = require(`../models/users/users`)

const editProfile =  async (req, res, next) => {

    const {userId, update} = req.body

    try {
        
        const currentUser = await user.findOneAndUpdate({_id: userId}, update)

        res.status(200).json({
            data: currentUser
        })

    } catch (err) {
        next(createError(400, err))
    }

}

const getCurrentUserInfo = async (req, res, next) => {

    const {userID} = req.params

    try {

        const info = await user.findOne({_id: userID})

        res.status(200).json({
            data: info
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

module.exports = {
    editProfile,
    getCurrentUserInfo
}