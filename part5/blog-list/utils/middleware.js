const logger = require('./logger')

const requestLogger = (req , _ ,next) => {
  logger.info('Method:',req.method)
  logger.info('Path:',req.path)
  logger.info('Body:',req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = ( _ ,res) => {
  res.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error, _ , res, next) => {
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return res.status(400).send({error:'malformatted id'})
  } else if(error.name === 'ValidationError'){
    return res.status(400).json({error:error.message})
  } else if( error.name === 'JsonWebTokenError'){
    return res.status(401).json({error:error.message})
  }
  next(error)
}

const tokenExtractor = (req , _ , next) => {
  const authorization = req.get('authorization')
  req.token = null
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}