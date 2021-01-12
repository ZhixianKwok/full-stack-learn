const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const {unknownEndpoint,errorHandler,requestLogger,tokenExtractor} = require('./utils/middleware')
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
app.use(tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
if(process.env.NODE_ENV === 'test'){
  const testRouter = require('./controllers/testing')
  app.use('/api/testing',testRouter)
}
app.use(unknownEndpoint)
app.use(errorHandler)
module.exports = app