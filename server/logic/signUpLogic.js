const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const tokensLogic = require('./tokensLogic')

class signUpLogic {

    createUser = async (req, res, next) => {
        try {
            const userData = req.body.user
            const usersWithSameUsername = await userModel.find({username: userData.username})
            if (usersWithSameUsername.length !== 0) {
                throw new Error('This username is already taken! Try something else!')
            }
            const hashPassword = await bcrypt.hash(userData.password, 4)
            const user = await userModel.create({username: userData.username, password: hashPassword, registrationDate: new Date()})
            const tokens = tokensLogic.generateTokens({username: user.username, userId: user._id})
            await tokensLogic.saveToken(user._id, tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(201).json({...tokens, userId: user._id})
        } catch(e) {
            return res.status(400).json({message: e.message})
        }
    }
}

module.exports = new signUpLogic()