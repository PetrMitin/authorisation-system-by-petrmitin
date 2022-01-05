require('dotenv').config()
const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')
const userModel = require('../models/userModel')

class tokensLogic {
    generateTokens = (payload) => {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    saveToken = async (userId, refreshToken) => {
        const tokenData = await tokenModel.findOne({userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await tokenData.save()
        }
        const token = await tokenModel.create({userId, refreshToken})
        return token
    }

    deleteToken = async refreshToken => {
        return await tokenModel.deleteOne({refreshToken})
    }

    verifyAccessToken = accessToken => {
        const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
        if (!userData) {
            return null
        }
        return jwt.decode(accessToken)
    }

    verifyRefreshToken = async refreshToken => {
        const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)
        if (!userData) return null
        const token = await tokenModel.findOne({refreshToken})
        if (!token) return null
        return token
    }

    refreshTokens = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies
            if (!refreshToken) throw new Error('Unauthorized user!')
            const tokenData = await this.verifyRefreshToken(refreshToken)
            if (!tokenData) throw new Error('Unauthorized user!')
            const user = await userModel.findById(tokenData.userId)
            await this.deleteToken(refreshToken)
            res.clearCookie('refreshToken')
            const tokens = this.generateTokens({username: user.username, userId: user._id})
            await this.saveToken(user._id, tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(201).json({...tokens, userId: user._id})
        } catch (e) {
            res.status(401).json({message: e.message})
        }
    }
}

module.exports = new tokensLogic()