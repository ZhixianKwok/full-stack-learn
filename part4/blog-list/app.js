const express = require('express')

const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

const MONGODB_URI = config.MONGODB_URI
mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:false})
.then( result => {
    logger.info('connected to MongoDB!')
})
.catch( error => {
    logger.error('error connecting to MongoDB', error.message)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)

module.exports = app