const express = require('express')
const {createUser} = require('./logic/signUpLogic')
const {signUserIn} = require('./logic/signInLogic')
const {signUserOut} = require('./logic/signOutLogic')
const {refreshTokens} = require('./logic/tokensLogic')
const {getUserRegistrationDate} = require('./logic/userDataLogic')

const router = express.Router()
router.post('/sign-up', createUser)
router.post('/sign-in', signUserIn)
router.post('/sign-out', signUserOut)
router.get('/refresh-tokens', refreshTokens)
router.get('/registration-date', getUserRegistrationDate)
module.exports = router 