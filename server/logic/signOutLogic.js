const tokensLogic = require('./tokensLogic')

class signOutLogic {
    signUserOut = async (req, res, next) => {
        const {refreshToken} = req.cookies
        await tokensLogic.deleteToken(refreshToken)
        res.clearCookie('refreshToken')
        return res.sendStatus(200)
    }
}

module.exports = new signOutLogic()