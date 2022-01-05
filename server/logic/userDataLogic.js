const userModel = require('../models/userModel')
const {verifyAccessToken} = require('./tokensLogic')

class userDataLogic {
    getUserRegistrationDate = async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                throw new Error('No authorisation header')
            }
            const accessToken = req.headers.authorization.split(' ')[1]
            const userData = verifyAccessToken(accessToken)
            if (!userData) {
                throw new Error('Invalid token')
            }
            const fullUserData = await userModel.findById(userData.userId)
            res.status(200).json({userId: fullUserData._id, registrationDate: fullUserData.registrationDate})
        } catch (e) {
            res.status(401).json({message: e.message})
        }
    }
}

module.exports = new userDataLogic()
