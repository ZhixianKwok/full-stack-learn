const config = require('./utils/config')
const app = require('./app')
const http = require('http')

const logger = require('./utils/logger')
const PORT = config.PORT

const server = http.createServer(app)
server.listen(PORT,()=>{
  logger.info(`Server running on port ${PORT}`)
})
