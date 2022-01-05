require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router')

mongoose.connect(process.env.MONGODB_URI)

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})