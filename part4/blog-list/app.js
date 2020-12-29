const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const {unknownEndpoint,errorHandler,requestLogger} = require('./utils/middleware')
const MONGODB_URI = config.MONGODB_URI

mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:false})
  .then( () => {
    logger.info('connected to MongoDB!')
  })
  .catch( error => {
    logger.error('error connecting to MongoDB', error.message)
  })

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use(unknownEndpoint)
app.use(errorHandler)
module.exports = app