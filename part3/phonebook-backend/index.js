require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const Person = require('./model/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const formateLogger = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}

app.use(morgan(formateLogger))

const PORT = process.env.PORT || 3001

app.get('/api/persons',( req , res ) => {
  Person.find({}).then( results => {
    res.json(results)
  })
})

app.get('/api/persons/:id',( req , res , next ) => {
  const id = req.params.id
    
  Person.find({ _id: id }).then( result => { 
    if( result ){
      res.status(200).json( result )
    } else {
      res.status(404).end()
    }
  }).catch( err => {
    next( err )
  })

})

app.delete('/api/persons/:id',( req , res , next ) => {
  Person.findByIdAndRemove( req.params.id ).then( () => {
    res.status(204).end()
  }).catch( err => {
    next( err )
  })
})

app.put('/api/persons/:id', (req, res , next) => {
  const person = req.body
    
  Person.findByIdAndUpdate( req.params.id , person , { new : true }).then( result => {
    res.json( result )
  }).catch(err => {
    next(err)
  })
})

app.post('/api/persons', ( req , res , next ) => {
  const personNew = req.body

  if( !personNew.number ){
    res.status(400).end('Number must be entered!')
  } 

  const person = new Person({
    ...personNew
  })

  person.save().then( result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    res.status(200).end()
  }).catch( err => {
    next( err )
  })
})

app.get('/info',( req , res , next ) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  Person.count({}).then( ( err , count ) => {
    if(err){
      next( err )
    }
    res.end(`
    <div>phonebook has info for ${count} people </div>
    <div>${new Date()}</div>
    `)  
  })
})

const unknownEndpoint = ( req , res ) => {
  res.end(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}
  
app.use(errorHandler)

app.listen(PORT,()=> {
  console.log(`server running on port ${PORT}`)
})