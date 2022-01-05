const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const tokensLogic = require('./tokensLogic')

class signInLogic {
    signUserIn = async (req, res, next) => {
        try {
            const {username, password} = req.body.user
            const user = await userModel.findOne({username})
            if (!user) {
                throw new Error('Invalid data!')
            }
            if (!await bcrypt.compare(password, user.password)) {
                throw new Error('Invalid data!')
            }
            const tokens = tokensLogic.generateTokens({username: user.username, userId: user._id})
            await tokensLogic.saveToken(user._id, tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(201).json({...tokens, userId: user._id})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e.message})
        }
    }
}

module.exports = new signInLogic()